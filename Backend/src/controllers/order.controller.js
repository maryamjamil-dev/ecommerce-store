const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Order = require("../model/order.model");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const User = require("../model/user.model");
const sendEmail = require("../utils/sendEmail");


const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 10;


const ENFORCE_STOCK = true;

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// ---------------------------------------------
// AUTHENTICATE USER USING LOGIN COOKIE
// ---------------------------------------------
const getUser = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    throw createError("Please login first", 401);
  }

  if (!process.env.JWT_SECRET) {
    throw createError("JWT configuration is missing", 500);
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw createError(
      "Your session is invalid or expired. Please login again.",
      401
    );
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw createError("User not found. Please login again.", 401);
  }

  return user;
};

// ---------------------------------------------
// ORDER CONFIRMATION EMAIL
// ---------------------------------------------
const sendOrderConfirmationEmail = async (order, user) => {
  const shipping = order.shippingAddress;

  const orderItemsHtml = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            ${escapeHtml(item.name)}
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            ${item.quantity}
          </td>
          <td style="padding:10px;border-bottom:1px solid #eee;">
            $${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
    )
    .join("");

  await sendEmail({
    to: user.email,
    subject: "Order Confirmation - Voltora Electronics",
    text: `
Hello ${shipping.fullName},

Thank you for shopping with Voltora Electronics.

Your order has been placed successfully.

Order ID: ${order._id}
Subtotal: $${order.subtotal.toFixed(2)}
Shipping: ${order.shippingFee === 0 ? "Free" : `$${order.shippingFee.toFixed(2)}`}
Total: $${order.totalAmount.toFixed(2)}
Payment Method: Cash on Delivery
Order Status: ${order.orderStatus}

Shipping Address:
${shipping.address},
${shipping.city},
${shipping.country}

Thank you for choosing Voltora Electronics.
    `,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#14181F;">
        <div style="background:#0B1F3A;padding:24px;text-align:center;">
          <h1 style="color:#ffffff;margin:0;">Voltora Electronics</h1>
        </div>

        <div style="padding:24px;">
          <h2>Order confirmed!</h2>
          <p>Hello ${escapeHtml(shipping.fullName)},</p>
          <p>Thank you for shopping with us. Your order has been placed successfully.</p>

          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Order Status:</strong> ${escapeHtml(order.orderStatus)}</p>
          <p><strong>Payment:</strong> Cash on Delivery</p>

          <h3>Order Items</h3>
          <table style="width:100%;border-collapse:collapse;text-align:left;">
            <thead>
              <tr>
                <th style="padding:10px;border-bottom:2px solid #ddd;">Product</th>
                <th style="padding:10px;border-bottom:2px solid #ddd;">Qty</th>
                <th style="padding:10px;border-bottom:2px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>${orderItemsHtml}</tbody>
          </table>

          <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
          <p>Shipping: ${order.shippingFee === 0 ? "Free" : `$${order.shippingFee.toFixed(2)}`}</p>
          <h3>Total: $${order.totalAmount.toFixed(2)}</h3>

          <h3>Shipping Address</h3>
          <p>
            ${escapeHtml(shipping.address)}<br/>
            ${escapeHtml(shipping.city)},
            ${escapeHtml(shipping.country)}
          </p>

          <p>Thank you for choosing Voltora Electronics!</p>
        </div>
      </div>
    `,
  });
};

// ---------------------------------------------
// POST: CREATE ORDER FROM DATABASE CART
// ---------------------------------------------
exports.createOrder = async (req, res) => {
  try {
    const user = await getUser(req);

    const { shippingAddress, paymentMethod = "COD" } = req.body;

    // Validate shipping address
    const requiredAddressFields = [
      "fullName",
      "phone",
      "address",
      "city",
      "country",
    ];

    if (
      !shippingAddress ||
      requiredAddressFields.some(
        (field) =>
          typeof shippingAddress[field] !== "string" ||
          !shippingAddress[field].trim()
      )
    ) {
      throw createError("Complete shipping address is required");
    }

    if (!["COD", "Online"].includes(paymentMethod)) {
      throw createError("Invalid payment method");
    }


    if (paymentMethod === "Online") {
      throw createError(
        "Online payments are not available yet. Please select Cash on Delivery."
      );
    }

    const claimedCart = await Cart.findOneAndUpdate(
      { user: user._id, "items.0": { $exists: true } },
      { $set: { items: [] } },
      { new: false }
    );

    if (!claimedCart) {
      throw createError("Your cart is empty");
    }

    const cartItems = claimedCart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));

    const reservedStock = [];


    const undo = async () => {
      for (const item of reservedStock) {
        try {
          await Product.updateOne(
            { _id: item.product },
            { $inc: { stock: item.quantity } }
          );
        } catch (undoError) {
          console.error("Stock restore failed:", undoError.message);
        }
      }

      try {
        await Cart.updateOne(
          { user: user._id },
          { $set: { items: cartItems } }
        );
      } catch (undoError) {
        console.error("Cart restore failed:", undoError.message);
      }
    };

    let order;

    try {
      for (const item of cartItems) {
        if (
          !mongoose.isValidObjectId(item.product) ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1
        ) {
          throw createError(
            "Your cart contains an invalid product or quantity"
          );
        }
      }

      const products = await Product.find({
        _id: { $in: cartItems.map((item) => item.product) },
      });

      const productMap = new Map(
        products.map((product) => [product._id.toString(), product])
      );

      const orderItems = [];


      for (const item of cartItems) {
        const product = productMap.get(item.product.toString());

        if (!product) {
          throw createError("A product in your cart no longer exists");
        }

        const price = Number(product.price);

        if (!Number.isFinite(price) || price < 0) {
          throw createError("A product has an invalid price");
        }

        orderItems.push({
          product: product._id,
          name: product.name || product.title || "Product",
          price,
          quantity: item.quantity,
          image: product.image || "",
        });
      }

      if (ENFORCE_STOCK) {
        for (const item of orderItems) {
          const result = await Product.updateOne(
            { _id: item.product, stock: { $gte: item.quantity } },
            { $inc: { stock: -item.quantity } }
          );

          if ((result.modifiedCount ?? result.nModified) !== 1) {
            throw createError(`${item.name} does not have enough stock`);
          }

          reservedStock.push({
            product: item.product,
            quantity: item.quantity,
          });
        }
      }

      const subtotal = Number(
        orderItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)
      );

      const shippingFee =
        subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

      const totalAmount = Number((subtotal + shippingFee).toFixed(2));

      order = await Order.create({
        user: user._id,
        items: orderItems,
        shippingAddress: {
          fullName: shippingAddress.fullName.trim(),
          phone: shippingAddress.phone.trim(),
          address: shippingAddress.address.trim(),
          city: shippingAddress.city.trim(),
          postalCode: shippingAddress.postalCode?.trim() || "",
          country: shippingAddress.country.trim(),
        },
        paymentMethod: "COD",
        paymentStatus: "Pending",
        orderStatus: "Pending",
        subtotal,
        shippingFee,
        totalAmount,
      });
    } catch (error) {
      await undo();
      throw error;
    }

    sendOrderConfirmationEmail(order, user).catch((emailError) => {
      console.error(
        "Order confirmation email failed:",
        emailError.message
      );
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    if (!error.statusCode) {
      console.error("Create Order Error:", error);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to create order",
    });
  }
};

// ---------------------------------------------
// GET: LOGGED-IN USER'S ORDERS
// ---------------------------------------------
exports.getMyOrders = async (req, res) => {
  try {
    const user = await getUser(req);

    const orders = await Order.find({ user: user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    if (!error.statusCode) {
      console.error("Get My Orders Error:", error);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to fetch orders",
    });
  }
};

// ---------------------------------------------
// GET: ONE ORDER BELONGING TO LOGGED-IN USER
// ---------------------------------------------
exports.getOrderById = async (req, res) => {
  try {
    const user = await getUser(req);
    const { orderId } = req.params;

    if (!mongoose.isValidObjectId(orderId)) {
      throw createError("Valid order ID is required");
    }

    const order = await Order.findOne({
      _id: orderId,
      user: user._id,
    }).populate("items.product", "name title image price");

    if (!order) {
      throw createError("Order not found", 404);
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    if (!error.statusCode) {
      console.error("Get Order Error:", error);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to fetch order",
    });
  }
};

// ---------------------------------------------
// PUT: ADMIN UPDATES ORDER STATUS
// ---------------------------------------------
exports.updateOrderStatus = async (req, res) => {
  try {
    const user = await getUser(req);

    if (user.role !== "admin") {
      throw createError("Only admins can update order status", 403);
    }

    const { orderId } = req.params;
    const { orderStatus } = req.body;

    if (!mongoose.isValidObjectId(orderId)) {
      throw createError("Valid order ID is required");
    }

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      throw createError("Invalid order status");
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw createError("Order not found", 404);
    }

    if (["Delivered", "Cancelled"].includes(order.orderStatus)) {
      throw createError(`This order is already ${order.orderStatus}`);
    }

    order.orderStatus = orderStatus;
    await order.save();

    if (orderStatus === "Cancelled" && ENFORCE_STOCK) {
      try {
        await Product.bulkWrite(
          order.items.map((item) => ({
            updateOne: {
              filter: { _id: item.product },
              update: { $inc: { stock: item.quantity } },
            },
          }))
        );
      } catch (restockError) {
        console.error("Restock after cancel failed:", restockError.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    if (!error.statusCode) {
      console.error("Update Order Status Error:", error);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Failed to update order status",
    });
  }
};

// ---------------------------------------------
// GET: ALL ORDERS (ADMIN ONLY)
// ---------------------------------------------
exports.getAllOrders = async (req, res) => {
  try {
    const user = await getUser(req);

    if (user.role !== "admin") {
      throw createError("Access denied. Admin only.", 403);
    }

    const orders = await Order.find()
      .populate("user", "username email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    if (!error.statusCode) {
      console.error("Get all orders error:", error);
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : "Failed to fetch orders",
    });
  }
};