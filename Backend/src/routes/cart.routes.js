const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  mergeCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller");

router.get("/", getCart);

router.post("/merge", mergeCart);

router.post("/items", addToCart);

router.put("/items/:productId", updateCartItem);

router.delete("/items/:productId", removeFromCart);

router.delete("/", clearCart);

module.exports = router;