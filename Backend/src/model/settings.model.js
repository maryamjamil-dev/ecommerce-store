const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    store: {
      storeName: { type: String, default: "Voltora", trim: true, maxlength: 80 },
      email: { type: String, default: "", trim: true, lowercase: true },
      phone: { type: String, default: "", trim: true },
      address: { type: String, default: "", trim: true, maxlength: 200 },
      currency: {
        type: String,
        enum: ["PKR", "USD", "EUR", "GBP"],
        default: "PKR",
      },
      timezone: { type: String, default: "Asia/Karachi" },
    },

    notifications: {
      newOrders: { type: Boolean, default: true },
      newUsers: { type: Boolean, default: true },
      newReviews: { type: Boolean, default: true },
      lowStock: { type: Boolean, default: true },
      emailNotifications: { type: Boolean, default: false },
    },

    orders: {
      autoConfirmOrders: { type: Boolean, default: true },
      allowGuestCheckout: { type: Boolean, default: true },
      allowOrderCancellation: { type: Boolean, default: true },
      minimumOrderAmount: { type: Number, default: 0, min: 0 },
    },

    security: {
      twoFactorAuth: { type: Boolean, default: false },
      loginAlerts: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);