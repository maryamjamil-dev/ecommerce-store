const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/my-orders", getMyOrders);

router.get("/admin/all", getAllOrders);

router.get("/:orderId", getOrderById);
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;