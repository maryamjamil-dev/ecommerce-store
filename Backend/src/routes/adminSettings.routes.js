const express = require("express");
const router = express.Router();

const {
  getSettings,
  updateSettings,
  updateProfile,
  changePassword,
} = require("../controllers/adminSettings.controller");

router.get("/", getSettings);
router.put("/", updateSettings);
router.put("/profile", updateProfile);
router.put("/password", changePassword);

module.exports = router;