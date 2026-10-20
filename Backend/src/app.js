const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/db");

const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const cartRoutes = require("./routes/cart.routes");
const reviewRoutes = require("./routes/review.routes");
const orderRoutes = require("./routes/order.routes");
const addressRoutes = require("./routes/address.routes");
const couponRoutes = require("./routes/coupon.routes");
const contactRoutes = require("./routes/contact.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const profileRoutes = require("./routes/profile.routes");
const adminStatsRoutes = require("./routes/adminStats.routes");
const adminUserRoutes = require("./routes/adminUser.routes");
const adminReviewRoutes = require("./routes/adminReview.routes");
const adminSettingsRoutes = require("./routes/adminSettings.routes");
const adminProductRoutes = require("./routes/adminProduct.routes");
const emailVerificationRoutes = require("./routes/emailVerification.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.set("trust proxy", 1);

const clientUrl = (process.env.CLIENT_URL || "").replace(/\/+$/, "");
const allowedOrigins = ["https://ecommerce-store-frontend-mka8ujoyo.vercel.app/", "https://ecommerce-store-sooty-eight.vercel.app/"];
if (clientUrl) allowedOrigins.push(clientUrl);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Make sure MongoDB is connected before any route runs
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("connection failed;", error.message);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin/stats", adminStatsRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/reviews", adminReviewRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/auth", emailVerificationRoutes);

module.exports = app;