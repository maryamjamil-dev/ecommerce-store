const Product = require("../model/product.model")
async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    const isInvalidId = error.name === "CastError";

    return res.status(isInvalidId ? 400 : 500).json({
      success: false,
      message: isInvalidId ? "Invalid product ID" : "Failed to fetch product",
    });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    const isInvalidId = error.name === "CastError";

    return res.status(isInvalidId ? 400 : 400).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    const isInvalidId = error.name === "CastError";

    return res.status(isInvalidId ? 400 : 500).json({
      success: false,
      message: isInvalidId ? "Invalid product ID" : "Failed to delete product",
    });
  }
}
async function seedProducts(req, res) {
  try {
    if (process.env.NODE_ENV === "production") {
      return res.status(403).json({
        success: false,
        message: "Seeding is disabled in production",
      });
    }

    const products = req.body.products;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Products array is required",
      });
    }

    const operations = products.map((product) => ({
      updateOne: {
        filter: {
          title: product.title,
          brand: product.brand,
        },
        update: {
          $set: {
            title: product.title,
            category: product.category,
            brand: product.brand,
            price: product.price,
            oldPrice: product.oldPrice ?? undefined,
            rating: product.rating ?? 0,
            reviews: product.reviews ?? 0,
            discount: product.discount ?? "",
            image: product.image,
            description: product.description,
            stock: product.stock ?? 10,
          },
        },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations);

    return res.status(200).json({
      success: true,
      message: "Products seeded successfully",
      received: products.length,
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to seed products",
      error: error.message,
    });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  seedProducts,
};

