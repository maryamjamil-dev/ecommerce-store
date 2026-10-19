const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const User = require("../model/user.model");
const Settings = require("../model/settings.model");

// ---------- Auth helpers ----------
const fail = (message, statusCode) =>
  Object.assign(new Error(message), { statusCode });

const getAdmin = async (req) => {
  const token = req.cookies?.token;
  if (!token) throw fail("Please login first", 401);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw fail("Session expired. Please login again", 401);
  }

  const user = await User.findById(decoded.id);
  if (!user) throw fail("User not found", 401);
  if (user.role !== "admin") throw fail("Admin access required", 403);

  return user;
};

const sendError = (res, error) =>
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
  });

const ALLOWED = {
  store: {
    storeName: "string",
    email: "string",
    phone: "string",
    address: "string",
    currency: "string",
    timezone: "string",
  },
  notifications: {
    newOrders: "boolean",
    newUsers: "boolean",
    newReviews: "boolean",
    lowStock: "boolean",
    emailNotifications: "boolean",
  },
  orders: {
    autoConfirmOrders: "boolean",
    allowGuestCheckout: "boolean",
    allowOrderCancellation: "boolean",
    minimumOrderAmount: "number",
  },
  security: {
    twoFactorAuth: "boolean",
    loginAlerts: "boolean",
  },
};

const getOrCreateSettings = async () =>
  (await Settings.findOne()) || (await Settings.create({}));

const adminInfo = (user) => ({
  username: user.username,
  email: user.email,
});

// GET /api/admin/settings
exports.getSettings = async (req, res) => {
  try {
    const admin = await getAdmin(req);
    const settings = await getOrCreateSettings();

    res.status(200).json({
      success: true,
      settings,
      admin: adminInfo(admin),
    });
  } catch (error) {
    sendError(res, error);
  }
};

// PUT /api/admin/settings
exports.updateSettings = async (req, res) => {
  try {
    await getAdmin(req);
    const settings = await getOrCreateSettings();

    let changed = false;

    for (const section of Object.keys(ALLOWED)) {
      const incoming = req.body[section];
      if (incoming === undefined) continue;

      if (typeof incoming !== "object" || incoming === null) {
        throw fail(`Invalid ${section} settings`, 400);
      }

      for (const [field, type] of Object.entries(ALLOWED[section])) {
        if (incoming[field] === undefined) continue;

        let value = incoming[field];

        if (type === "string") {
          if (typeof value !== "string") throw fail(`${field} must be text`, 400);
          value = value.trim();
        }

        if (type === "boolean" && typeof value !== "boolean") {
          throw fail(`${field} must be true or false`, 400);
        }

        if (type === "number") {
          value = Number(value);
          if (!Number.isFinite(value) || value < 0) {
            throw fail(`${field} must be 0 or more`, 400);
          }
        }

        settings[section][field] = value;
        changed = true;
      }

      settings.markModified(section);
    }

    if (!changed) throw fail("Nothing to update", 400);

    if (settings.store.storeName === "") {
      throw fail("Store name is required", 400);
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings saved successfully",
      settings,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ success: false, message: error.message });
    }
    sendError(res, error);
  }
};

// PUT /api/admin/settings/profile
exports.updateProfile = async (req, res) => {
  try {
    const admin = await getAdmin(req);

    const username = req.body.username?.toString().trim();
    const email = req.body.email?.toString().trim().toLowerCase();

    if (!username || username.length < 3 || username.length > 30) {
      throw fail("Name must be 3 to 30 characters", 400);
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      throw fail("Enter a valid email address", 400);
    }

    if (email !== admin.email) {
      const taken = await User.findOne({ email, _id: { $ne: admin._id } });
      if (taken) throw fail("This email is already in use", 409);
    }

    admin.username = username;
    admin.email = email;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: adminInfo(admin),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: "This email is already in use" });
    }
    sendError(res, error);
  }
};

// PUT /api/admin/settings/password
exports.changePassword = async (req, res) => {
  try {
    const admin = await getAdmin(req);

    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      throw fail("All password fields are required", 400);
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      throw fail("New password must be at least 6 characters", 400);
    }

    if (newPassword !== confirmPassword) {
      throw fail("New passwords do not match", 400);
    }

    if (newPassword === currentPassword) {
      throw fail("New password must be different from the current one", 400);
    }

    const user = await User.findById(admin._id).select("+password");

    const matches = await bcrypt.compare(currentPassword, user.password);
    if (!matches) throw fail("Current password is incorrect", 400);

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    sendError(res, error);
  }
};