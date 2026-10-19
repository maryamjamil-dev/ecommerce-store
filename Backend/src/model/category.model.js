const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [60, "Category name cannot exceed 60 characters"],
    },

    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    group: {
      type: String,
      default: "Other",
      trim: true,
      maxlength: [80, "Group cannot exceed 80 characters"],
    },

    icon: {
      type: String,
      default: "",
      trim: true,
      maxlength: [60, "Icon name cannot exceed 60 characters"],
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


categorySchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;