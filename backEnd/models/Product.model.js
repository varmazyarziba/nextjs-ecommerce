const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
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
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    discountPrice: Number,

    stock: {
      type: Number,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
    },

    images: [String],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    specs: {
      type: Map,
      of: String,
    },

    tags: [{
      type: String,
      enum: [
        "featured",
        "bestSeller"
      ]
    }],

    isActive: {
      type: Boolean,
      default: true,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
