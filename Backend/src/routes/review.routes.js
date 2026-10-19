const express = require("express");
const router = express.Router();

const {
  getAllReviews,
  getReviewableProducts,
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");

router.get("/", getAllReviews);
router.get("/products/list", getReviewableProducts);

router.get("/:productId", getProductReviews);
router.post("/:productId", createReview);
router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);

module.exports = router;