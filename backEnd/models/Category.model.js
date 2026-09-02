const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // null = دسته اصلی
    },

    level: {
      type: Number,
      default: 0, // 0: main, 1: sub, 2: child
    },

    order: {
      type: Number,
      default: 0,
    },

    icon: {
      type: String, // مثلا: "cpu", "laptop", "camera"
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    showInMenu: {
      type: Boolean,
      default: true,
    },

    seo: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
