const Category = require("../model/category.model");
const Product = require("../model/product.model");

const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");


const normalizeCategory = (category) => ({
  ...category,
  group: category.group || "Other",
  icon: category.icon || "",
  isActive: category.isActive !== false,
});

// Create category
const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, isActive, group, icon } = req.body;

    const cleanName = name?.toString().trim();
    const finalSlug = slugify(slug || cleanName);

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    if (!finalSlug) {
      return res.status(400).json({
        success: false,
        message: "A valid category slug is required",
      });
    }

    const category = await Category.create({
      name: cleanName,
      slug: finalSlug,
      description: description?.toString().trim() || "",
      group: group?.toString().trim() || "Other",
      icon: icon?.toString().trim() || "",
      image: image?.toString().trim() || "",
      isActive: typeof isActive === "boolean" ? isActive : true,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name or slug already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = (
      await Category.find({ isActive: { $ne: false } })
        .sort({ name: 1 })
        .lean()
    ).map(normalizeCategory);

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

const getAdminCategories = async (req, res) => {
  try {
    const categories = (
      await Category.find().sort({ createdAt: -1 }).lean()
    ).map(normalizeCategory);

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get admin categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};


const getCategoryBySlug = async (req, res) => {
  try {
    const slug = slugify(req.params.slug);

    const category = await Category.findOne({
      slug,
      isActive: { $ne: false },
    }).lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const products = await Product.find({ category: category.name })
      .collation({ locale: "en", strength: 2 })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      category: normalizeCategory(category),
      count: products.length,

      products: products.map((product) => ({
        ...product,
        id: product._id.toString(),
      })),
    });
  } catch (error) {
    console.error("Get category by slug error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).lean();

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    const invalidId = error.name === "CastError";

    return res.status(invalidId ? 400 : 500).json({
      success: false,
      message: invalidId
        ? "Invalid category ID"
        : "Failed to fetch category",
    });
  }
};

// Update category
const updateCategory = async (req, res) => {
  try {
    const { name, slug, description, image, isActive, group, icon } = req.body;
    const updates = {};

    if (name !== undefined) {
      const cleanName = name.toString().trim();

      if (!cleanName) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      updates.name = cleanName;
      updates.slug = slugify(slug || cleanName);
    } else if (slug !== undefined) {
      updates.slug = slugify(slug);
    }

    if (description !== undefined) {
      updates.description = description.toString().trim();
    }

    if (group !== undefined) {
      updates.group = group.toString().trim() || "Other";
    }

    if (icon !== undefined) {
      updates.icon = icon.toString().trim();
    }

    if (image !== undefined) {
      updates.image = image.toString().trim();
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be true or false",
        });
      }

      updates.isActive = isActive;
    }

    if (updates.slug === "") {
      return res.status(400).json({
        success: false,
        message: "A valid category slug is required",
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category name or slug already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
    });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    const invalidId = error.name === "CastError";

    return res.status(invalidId ? 400 : 500).json({
      success: false,
      message: invalidId
        ? "Invalid category ID"
        : "Failed to delete category",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getAdminCategories,
  getCategoryBySlug,
  getCategoryById,
  updateCategory,
  deleteCategory,
};