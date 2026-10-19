const Review = require("../model/review.model"); 

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "username email")
      .populate("product", "name title")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    const invalidId = error.name === "CastError";

    return res.status(invalidId ? 400 : 500).json({
      success: false,
      message: invalidId ? "Invalid review ID" : "Failed to delete review",
    });
  }
};

module.exports = { getAllReviews, deleteReview };