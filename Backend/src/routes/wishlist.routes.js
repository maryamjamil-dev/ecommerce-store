const express = require("express");
const router = express.Router();

const {
  getWishlist,
  addToWishlist,
  mergeWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlist.controller");

router.get("/", getWishlist);
router.post("/", addToWishlist);

router.post("/merge", mergeWishlist);

router.delete("/clear", clearWishlist);
router.delete("/:productId", removeFromWishlist);

module.exports = router;