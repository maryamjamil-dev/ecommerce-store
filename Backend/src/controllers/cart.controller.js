const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");

const ENFORCE_STOCK = true;

const getUserId = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login first");
    error.statusCode = 401;
    throw error;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error("Session expired. Please login again");
    error.statusCode = 401;
    throw error;
  }

  const user = await User.findById(decoded.id).select("_id");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return user._id;
};

const checkStock = (product, quantity) => {
  if (!ENFORCE_STOCK) return null;

  if (product.stock < 1) {
    return `${product.title} is out of stock`;
  }

  if (quantity > product.stock) {
    return `Only ${product.stock} of ${product.title} left in stock`;
  }

  return null;
};

const getCartResponse = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  const items = (cart?.items || [])
    .filter((item) => item.product)
    .map((item) => ({
      product: item.product,
      quantity: item.quantity,
      subtotal: Number(item.product.price || 0) * item.quantity,
    }));

  return {
    user: userId,
    items,
    totalItems: items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ),
    totalPrice: items.reduce(
      (sum, item) => sum + item.subtotal,
      0
    ),
  };
};

// GET /api/cart
exports.getCart = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const cart = await getCartResponse(userId);

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to fetch cart",
    });
  }
};

// POST /api/cart/items
exports.addToCart = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { productId, quantity = 1 } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid MongoDB productId is required",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const newQuantity = (existingItem?.quantity || 0) + quantity;

    const stockError = checkStock(product, newQuantity);

    if (stockError) {
      return res.status(400).json({
        success: false,
        message: stockError,
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity: newQuantity });
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart: await getCartResponse(userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to add product to cart",
    });
  }
};

exports.mergeCart = async (req, res) => {
  try {
    const userId = await getUserId(req);

    const incoming = Array.isArray(req.body.items) ? req.body.items : [];

    const validItems = incoming.filter(
      (item) =>
        mongoose.isValidObjectId(item?.productId) &&
        Number.isInteger(item?.quantity) &&
        item.quantity > 0
    );

    const products = await Product.find({
      _id: { $in: validItems.map((item) => item.productId) },
    }).select("title stock");

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product])
    );

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    for (const { productId, quantity } of validItems) {
      const product = productMap.get(String(productId));

      // Jo product database mein nahi, use chhor dein
      if (!product) continue;

      const existingItem = cart.items.find(
        (item) => item.product.toString() === String(productId)
      );

      let nextQuantity = Math.max(existingItem?.quantity || 0, quantity);

      if (ENFORCE_STOCK) {
        nextQuantity = Math.min(nextQuantity, product.stock);
      }

      if (nextQuantity < 1) continue;

      if (existingItem) {
        existingItem.quantity = nextQuantity;
      } else {
        cart.items.push({ product: productId, quantity: nextQuantity });
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart merged successfully",
      cart: await getCartResponse(userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to merge cart",
    });
  }
};

// PUT /api/cart/items/:productId
exports.updateCartItem = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid MongoDB productId is required",
      });
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a positive integer",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (entry) => entry.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const stockError = checkStock(product, quantity);

    if (stockError) {
      return res.status(400).json({
        success: false,
        message: stockError,
      });
    }

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cart: await getCartResponse(userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to update cart",
    });
  }
};

// DELETE /api/cart/items/:productId
exports.removeFromCart = async (req, res) => {
  try {
    const userId = await getUserId(req);
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid MongoDB productId is required",
      });
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const exists = cart.items.some(
      (item) => item.product.toString() === productId
    );

    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart: await getCartResponse(userId),
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to remove product from cart",
    });
  }
};

// DELETE /api/cart
exports.clearCart = async (req, res) => {
  try {
    const userId = await getUserId(req);

    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { upsert: true, new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart: {
        user: userId,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      },
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to clear cart",
    });
  }
};