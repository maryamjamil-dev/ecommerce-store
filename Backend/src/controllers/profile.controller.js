const User = require("../model/user.model");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

// ========================================
// UPDATE USER PROFILE
// PATCH /api/profile
// ========================================
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updateData = {};

    if (username !== undefined) {
      if (
        typeof username !== "string" ||
        username.trim().length < 3 ||
        username.trim().length > 30
      ) {
        return res.status(400).json({
          success: false,
          message: "Username must be between 3 and 30 characters",
        });
      }

      updateData.username = username.trim();
    }

    if (email !== undefined) {
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid email address",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: req.user.id },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use",
        });
      }

      updateData.email = normalizedEmail;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a username or email to update",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// ========================================
// CHANGE PASSWORD
// PATCH /api/profile/change-password
// ========================================
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate request body
    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (typeof user.password !== "string" || !user.password) {
      console.error("Stored password is missing for user:", user._id);

      return res.status(500).json({
        success: false,
        message: "Stored password is missing. Check registration logic.",
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash and save new password
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change Password Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};
