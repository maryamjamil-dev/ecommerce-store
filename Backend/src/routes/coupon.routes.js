const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getCoupons,
  validateCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/coupon.controller");

router.post("/", createCoupon);
router.get("/", getCoupons);
router.post("/validate", validateCoupon);
router.put("/:couponId", updateCoupon);
router.delete("/:couponId", deleteCoupon);

module.exports = router;
