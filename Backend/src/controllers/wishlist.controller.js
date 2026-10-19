const mongoose = require("mongoose");
const Wishlist = require("../model/wishlist.model");
const Product = require("../model/product.model");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const getUserId = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login first");
    error.statusCode = 401;
    throw error;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error("Session expired. Please login again");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.id).select("_id");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return user._id;
};

const formatWishlist = (wishlist, userId) => ({
  user: userId,
  products: (wishlist?.products || []).filter(Boolean),
});

// Get wishlist
exports.getWishlist = async (req, res) => {
  try {
    const userId = await getUserId(req);

    const wishlist = await Wishlist.findOne({ user: userId })
      .populate("products")
      .lean();

    return res.status(200).json({
      success: true,
      wishlist: formatWishlist(wishlist, userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to fetch wishlist",
    });
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { productId } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid productId is required",
      });
    }

    const product = await Product.findById(productId).select("_id");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .populate("products")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist: formatWishlist(wishlist, userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to add product to wishlist",
    });
  }
};

exports.mergeWishlist = async (req, res) => {
  try {
    const userId = await getUserId(req);

    const incoming = Array.isArray(req.body.productIds)
      ? req.body.productIds
      : [];

    const validIds = incoming.filter((id) => mongoose.isValidObjectId(id));

    const existingProducts = await Product.find({
      _id: { $in: validIds },
    }).select("_id");

    const existingIds = existingProducts.map((product) => product._id);

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: { $each: existingIds } } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .populate("products")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Wishlist merged successfully",
      wishlist: formatWishlist(wishlist, userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to merge wishlist",
    });
  }
};

// Remove one product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid productId is required",
      });
    }

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $pull: { products: productId } },
      { new: true }
    )
      .populate("products")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist: formatWishlist(wishlist, userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to remove product from wishlist",
    });
  }
};

// Clear entire wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const userId = await getUserId(req);

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $set: { products: [] } },
      { new: true }
    )
      .populate("products")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
      wishlist: formatWishlist(wishlist, userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to clear wishlist",
    });
  }
};