const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  deleteReview,
} = require("../controllers/adminReview.controller");



router.get("/", getAllReviews);
router.delete("/:id", deleteReview);

module.exports = router;