const Product = require("../model/product.model");

const fail = (message, statusCode = 400) =>
  Object.assign(new Error(message), { statusCode });

const requiredText = (value, label) => {
  const text = value?.toString().trim();
  if (!text) throw fail(`${label} is required`);
  return text;
};

const cleanProductData = (body, isUpdate = false) => {
  const set = {};
  const unset = {};
  const has = (key) => body[key] !== undefined;

  if (!isUpdate || has("title")) set.title = requiredText(body.title, "Product title");
  if (!isUpdate || has("category")) set.category = requiredText(body.category, "Category");
  if (!isUpdate || has("brand")) set.brand = requiredText(body.brand, "Brand");
  if (!isUpdate || has("image")) set.image = requiredText(body.image, "Image URL");
  if (!isUpdate || has("description"))
    set.description = requiredText(body.description, "Description");

  if (!isUpdate || has("price")) {
    const price = Number(body.price);
    if (body.price === "" || body.price === null || !Number.isFinite(price) || price < 0) {
      throw fail("Price must be 0 or more");
    }
    set.price = price;
  }

  if (has("stock")) {
    const stock = Number(body.stock);
    if (!Number.isInteger(stock) || stock < 0) {
      throw fail("Stock must be a whole number, 0 or more");
    }
    set.stock = stock;
  }

  if (has("oldPrice")) {
    if (body.oldPrice === "" || body.oldPrice === null) {
      unset.oldPrice = 1;
    } else {
      const oldPrice = Number(body.oldPrice);
      if (!Number.isFinite(oldPrice) || oldPrice < 0) {
        throw fail("Old price must be 0 or more");
      }
      set.oldPrice = oldPrice;
    }
  }

  if (has("discount")) set.discount = body.discount.toString().trim();

  if (!set.discount && set.oldPrice && set.price && set.oldPrice > set.price) {
    const percent = Math.round(((set.oldPrice - set.price) / set.oldPrice) * 100);
    if (percent > 0) set.discount = `${percent}% OFF`;
  }

  return { set, unset };
};

const sendError = (res, error, fallback) => {
  console.error(fallback, "->", error);

  if (error.statusCode) {
    return res.status(error.statusCode).json({ success: false, message: error.message });
  }
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "field";
    return res.status(409).json({
      success: false,
      message: `Duplicate value for "${field}". Another product already uses it.`,
    });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }
  return res
    .status(500)
    .json({ success: false, message: `${fallback}: ${error.message}` });
};

// GET /api/admin/products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    sendError(res, error, "Failed to fetch products");
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { set } = cleanProductData(req.body);
    const product = await Product.create(set);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    sendError(res, error, "Failed to create product");
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { set, unset } = cleanProductData(req.body, true);

    if (!Object.keys(set).length && !Object.keys(unset).length) {
      throw fail("Provide at least one field to update");
    }

    const update = {};
    if (Object.keys(set).length) update.$set = set;
    if (Object.keys(unset).length) update.$unset = unset;

    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!product) throw fail("Product not found", 404);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    sendError(res, error, "Failed to update product");
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw fail("Product not found", 404);

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    sendError(res, error, "Failed to delete product");
  }
};