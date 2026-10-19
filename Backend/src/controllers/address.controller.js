const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Address = require("../model/address.model");
const User = require("../model/user.model");

const getUserId = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login first");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("_id");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return user._id;
};

const requiredFields = [
  "fullName",
  "phone",
  "address",
  "city",
  "country",
];

const validateAddress = (data) => {
  for (const field of requiredFields) {
    if (
      typeof data[field] !== "string" ||
      !data[field].trim()
    ) {
      return `${field} is required`;
    }
  }

  if (
    data.postalCode !== undefined &&
    typeof data.postalCode !== "string"
  ) {
    return "postalCode must be a string";
  }

  if (
    data.isDefault !== undefined &&
    typeof data.isDefault !== "boolean"
  ) {
    return "isDefault must be true or false";
  }

  return null;
};


exports.createAddress = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const validationError = validateAddress(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const { isDefault = false, ...addressData } = req.body;


    if (isDefault) {
      await Address.updateMany(
        { user: userId },
        { $set: { isDefault: false } }
      );
    }

    const address = await Address.create({
      ...addressData,
      user: userId,
      isDefault,
    });

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to add address",
    });
  }
};

exports.getMyAddresses = async (req, res) => {
  try {
    const userId = await getUserId(req);

    const addresses = await Address.find({ user: userId })
      .sort({ isDefault: -1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalAddresses: addresses.length,
      addresses,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to fetch addresses",
    });
  }
};


exports.updateAddress = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { addressId } = req.params;
    const updates = req.body;

    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Valid address ID is required",
      });
    }

    const allowedFields = [
      "fullName",
      "phone",
      "address",
      "city",
      "postalCode",
      "country",
      "isDefault",
    ];

    const keys = Object.keys(updates);

    if (
      keys.length === 0 ||
      keys.some((key) => !allowedFields.includes(key))
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide valid address fields to update",
      });
    }

    for (const field of requiredFields) {
      if (
        updates[field] !== undefined &&
        (typeof updates[field] !== "string" ||
          !updates[field].trim())
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} cannot be empty`,
        });
      }
    }

    if (
      updates.postalCode !== undefined &&
      typeof updates.postalCode !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "postalCode must be a string",
      });
    }

    if (
      updates.isDefault !== undefined &&
      typeof updates.isDefault !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message: "isDefault must be true or false",
      });
    }

    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (updates.isDefault === true) {
      await Address.updateMany(
        { user: userId, _id: { $ne: addressId } },
        { $set: { isDefault: false } }
      );
    }

    for (const key of keys) {
      address[key] =
        typeof updates[key] === "string"
          ? updates[key].trim()
          : updates[key];
    }

    await address.save();

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to update address",
    });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { addressId } = req.params;

    if (!mongoose.isValidObjectId(addressId)) {
      return res.status(400).json({
        success: false,
        message: "Valid address ID is required",
      });
    }

    const address = await Address.findOneAndDelete({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to delete address",
    });
  }
};
