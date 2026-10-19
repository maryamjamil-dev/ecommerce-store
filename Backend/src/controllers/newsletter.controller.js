
const Newsletter = require("../model/newsletter.model");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

// Check admin authentication
const checkAdmin = async (req) => {
  const token = req.cookies?.token;

  if (!token) {
    const error = new Error("Please login as admin");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.role !== "admin") {
    const error = new Error("Admin access required");
    error.statusCode = 403;
    throw error;
  }
};

// Subscribe
exports.subscribeNewsletter = async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    let subscriber = await Newsletter.findOne({ email });

    if (subscriber?.isSubscribed) {
      return res.status(409).json({
        success: false,
        message: "Email is already subscribed",
      });
    }

    if (subscriber) {
      subscriber.isSubscribed = true;
      subscriber.subscribedAt = new Date();
      await subscriber.save();
    } else {
      subscriber = await Newsletter.create({ email });
    }

    return res.status(201).json({
      success: true,
      message: "Newsletter subscription successful",
      data: subscriber,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email is already subscribed",
      });
    }

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.statusCode ? error.message : "Server error while subscribing",
    });
  }
};

// Unsubscribe
exports.unsubscribeNewsletter = async (req, res) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const subscriber = await Newsletter.findOneAndUpdate(
      { email, isSubscribed: true },
      { $set: { isSubscribed: false } },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Active subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while unsubscribing",
    });
  }
};

// Get all active subscribers (admin only)
exports.getSubscribers = async (req, res) => {
  try {
    await checkAdmin(req);

    const subscribers = await Newsletter.find({
      isSubscribed: true,
    }).sort({ subscribedAt: -1 });

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Server error while fetching subscribers",
    });
  }
};

// Delete a subscriber (admin only)
exports.deleteSubscriber = async (req, res) => {
  try {
    await checkAdmin(req);

    const { subscriberId } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(subscriberId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscriber ID",
      });
    }

    const subscriber = await Newsletter.findByIdAndDelete(subscriberId);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Server error while deleting subscriber",
    });
  }
};
