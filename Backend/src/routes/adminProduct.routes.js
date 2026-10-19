const express = require("express");
const router = express.Router();

const requireAdmin = require("../middleware/adminAuth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/adminProduct.controller");

router.use(requireAdmin);

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;