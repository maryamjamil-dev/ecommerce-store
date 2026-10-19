const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

// ========================================
// VERIFY LOGIN
// ========================================
exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verify that the user still exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// ========================================
// ADMIN ROLE CHECK
// ========================================
exports.adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }

  return next();
};
