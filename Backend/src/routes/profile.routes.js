
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profile.controller");

router.get("/", protect, getProfile);
router.patch("/", protect, updateProfile);
router.patch("/change-password", protect, changePassword);

module.exports = router;
