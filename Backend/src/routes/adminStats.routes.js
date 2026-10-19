const express = require("express");
const router = express.Router();

const {
  getAdminStats,
} = require("../controllers/adminStats.controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");

router.get("/", protect, adminOnly, getAdminStats);

module.exports = router;
