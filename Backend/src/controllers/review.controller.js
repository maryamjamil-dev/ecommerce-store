const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Review = require("../model/review.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

const getUserId = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login first to leave a review");
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

  const user = await User.findById(decoded.id).select("_id");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return user._id;
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "username")
      .populate("product", "title")
      .sort({ createdAt: -1 })
      .limit(30);

    const [stats] = await Review.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          average: { $avg: "$rating" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      totalReviews: stats?.total || 0,
      averageRating: stats ? Number(stats.average.toFixed(1)) : 0,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

exports.getReviewableProducts = async (req, res) => {
  try {
    const products = await Product.find().select("_id title").sort({ title: 1 });

    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Please select a product",
      });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    if (
      typeof comment !== "string" ||
      comment.trim().length < 3 ||
      comment.trim().length > 1000
    ) {
      return res.status(400).json({
        success: false,
        message: "Comment must be between 3 and 1000 characters",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingReview = await Review.findOne({
      user: userId,
      product: productId,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment: comment.trim(),
    });

    await review.populate("user", "username email");

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to add review",
    });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const reviews = await Review.find({ product: productId })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              totalReviews
            ).toFixed(1)
          );

    return res.status(200).json({
      success: true,
      totalReviews,
      averageRating,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product reviews",
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Valid review ID is required",
      });
    }

    if (rating === undefined && comment === undefined) {
      return res.status(400).json({
        success: false,
        message: "Provide a rating or comment to update",
      });
    }

    if (
      rating !== undefined &&
      (!Number.isInteger(rating) || rating < 1 || rating > 5)
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 5",
      });
    }

    if (
      comment !== undefined &&
      (typeof comment !== "string" ||
        comment.trim().length < 3 ||
        comment.trim().length > 1000)
    ) {
      return res.status(400).json({
        success: false,
        message: "Comment must be between 3 and 1000 characters",
      });
    }

    const review = await Review.findOne({ _id: reviewId, user: userId });

    if (!review) {
      const otherReview = await Review.exists({ _id: reviewId });

      return res.status(otherReview ? 403 : 404).json({
        success: false,
        message: otherReview
          ? "You can only update your own review"
          : "Review not found",
      });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment.trim();

    await review.save();
    await review.populate("user", "username email");

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to update review",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { reviewId } = req.params;

    if (!mongoose.isValidObjectId(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Valid review ID is required",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own review",
      });
    }

    await Review.findByIdAndDelete(reviewId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to delete review",
    });
  }
};