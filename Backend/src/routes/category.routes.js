const express = require("express");
const router = express.Router();

const {
  createCategory,
  getAllCategories,
  getAdminCategories,
  getCategoryBySlug,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const {
  protect,
  adminOnly,
} = require("../middleware/auth.middleware");


router.get("/", getAllCategories);


router.get("/admin/all", protect, adminOnly, getAdminCategories);

router.get("/slug/:slug", getCategoryBySlug);

router.get("/:id", getCategoryById);

router.post("/", protect, adminOnly, createCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;