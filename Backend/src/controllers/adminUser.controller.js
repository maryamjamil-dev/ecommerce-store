const User = require("../model/user.model");

const VALID_ROLES = ["user", "admin"];

// Get all users 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// Update user role
const updateUser = async (req, res) => {
  try {
    const { role } = req.body;

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role must be 'user' or 'admin'",
      });
    }

    if (req.user && String(req.user._id || req.user.id) === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your own role",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    const invalidId = error.name === "CastError";
    return res.status(invalidId ? 400 : 500).json({
      success: false,
      message: invalidId ? "Invalid user ID" : "Failed to update user",
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    if (req.user && String(req.user._id || req.user.id) === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    const invalidId = error.name === "CastError";
    return res.status(invalidId ? 400 : 500).json({
      success: false,
      message: invalidId ? "Invalid user ID" : "Failed to delete user",
    });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };