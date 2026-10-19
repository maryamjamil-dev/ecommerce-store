const express = require("express");
const router = express.Router();

const {
  sendVerificationCode,
  verifyEmail,
} = require("../controllers/emailVerification.controller");

console.log("sendVerificationCode:", typeof sendVerificationCode);
console.log("verifyEmail:", typeof verifyEmail);

router.post("/send-code", sendVerificationCode);
router.post("/verify-email", verifyEmail);

module.exports = router;
