const Coupon = require("../model/coupon.model");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

// Logged-in user check
const getUser = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login first");
    error.statusCode = 401;
    throw error;
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    const error = new Error("Session expired. Please login again");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return user;
};

// Admin permission check
const getAdmin = async (req) => {
  const user = await getUser(req);

  if (user.role !== "admin") {
    const error = new Error("Admin access required");
    error.statusCode = 403;
    throw error;
  }

  return user;
};

const badRequest = (message) =>
  Object.assign(new Error(message), { statusCode: 400 });

// Validate coupon data
const validateCouponData = (data, isUpdate = false) => {
  if (!isUpdate || data.code !== undefined) {
    if (typeof data.code !== "string" || !data.code.trim()) {
      throw badRequest("Coupon code is required");
    }
  }

  if (!isUpdate || data.discountType !== undefined) {
    if (!["percentage", "fixed"].includes(data.discountType)) {
      throw badRequest("Invalid discount type");
    }
  }

  if (!isUpdate || data.discountValue !== undefined) {
    if (
      typeof data.discountValue !== "number" ||
      !Number.isFinite(data.discountValue) ||
      data.discountValue <= 0
    ) {
      throw badRequest("Discount value must be greater than zero");
    }
  }

  if (
    data.discountType === "percentage" &&
    data.discountValue !== undefined &&
    data.discountValue > 100
  ) {
    throw badRequest("Percentage cannot exceed 100");
  }

  for (const field of ["minOrderAmount", "maxDiscount", "usageLimit"]) {
    if (
      data[field] !== undefined &&
      data[field] !== null &&
      (typeof data[field] !== "number" ||
        !Number.isFinite(data[field]) ||
        data[field] < 0 ||
        (field === "usageLimit" && data[field] < 1))
    ) {
      throw badRequest(`Invalid ${field}`);
    }
  }

  if (data.usedCount !== undefined) {
    throw badRequest("usedCount cannot be set manually");
  }

  if (data.isActive !== undefined) {
    if (!isUpdate) {
      throw badRequest("isActive cannot be set during creation");
    }
    if (typeof data.isActive !== "boolean") {
      throw badRequest("isActive must be true or false");
    }
  }

  if (
    data.expiresAt !== undefined &&
    data.expiresAt !== null &&
    Number.isNaN(Date.parse(data.expiresAt))
  ) {
    throw badRequest("Invalid expiry date");
  }
};

// Create coupon (Admin)
exports.createCoupon = async (req, res) => {
  try {
    await getAdmin(req);
    validateCouponData(req.body);

    const {
      code,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      expiresAt,
      usageLimit,
    } = req.body;

    const coupon = await Coupon.create({
      code: code.trim().toUpperCase(),
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      expiresAt,
      usageLimit,
    });

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    res.status(error.statusCode || (error.code === 11000 ? 409 : 500)).json({
      success: false,
      message:
        error.code === 11000 ? "Coupon code already exists" : error.message,
    });
  }
};

// Get all coupons (Admin)
exports.getCoupons = async (req, res) => {
  try {
    await getAdmin(req);

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      coupons,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.validateCoupon = async (req, res) => {
  try {
    await getUser(req);

    const code =
      typeof req.body.code === "string"
        ? req.body.code.trim().toUpperCase()
        : "";

    const orderAmount = req.body.orderAmount;

    if (
      !code ||
      typeof orderAmount !== "number" ||
      !Number.isFinite(orderAmount) ||
      orderAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid code and positive orderAmount are required",
      });
    }

    const coupon = await Coupon.findOne({ code });

    if (!coupon || !coupon.isActive) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found or inactive",
      });
    }

    if (coupon.expiresAt && coupon.expiresAt <= new Date()) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ${coupon.minOrderAmount}`,
      });
    }

    let discount =
      coupon.discountType === "percentage"
        ? (orderAmount * coupon.discountValue) / 100
        : coupon.discountValue;

    if (coupon.maxDiscount !== null) {
      discount = Math.min(discount, coupon.maxDiscount);
    }

    discount = Math.min(discount, orderAmount);
    discount = Math.round(discount * 100) / 100;

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
      orderAmount,
      discount,
      finalAmount: Math.round((orderAmount - discount) * 100) / 100,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update coupon (Admin)
exports.updateCoupon = async (req, res) => {
  try {
    await getAdmin(req);

    const { couponId } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(couponId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon ID",
      });
    }

    const allowedFields = [
      "code",
      "description",
      "discountType",
      "discountValue",
      "minOrderAmount",
      "maxDiscount",
      "expiresAt",
      "usageLimit",
      "isActive",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update",
      });
    }

    validateCouponData(updates, true);

    if (updates.code !== undefined) {
      updates.code = updates.code.trim().toUpperCase();
    }

    const coupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
      runValidators: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (error) {
    res.status(error.statusCode || (error.code === 11000 ? 409 : 500)).json({
      success: false,
      message:
        error.code === 11000 ? "Coupon code already exists" : error.message,
    });
  }
};

// Delete coupon (Admin)
exports.deleteCoupon = async (req, res) => {
  try {
    await getAdmin(req);

    const { couponId } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(couponId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid coupon ID",
      });
    }

    const coupon = await Coupon.findByIdAndDelete(couponId);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};