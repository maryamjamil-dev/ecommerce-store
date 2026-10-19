const express = require("express");

const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  seedProducts,
} = require("../controllers/product.controller");

router.post("/", createProduct);

router.get("/", getAllProducts);

router.post("/seed", seedProducts)

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;

