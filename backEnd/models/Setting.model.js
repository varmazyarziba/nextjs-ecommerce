const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  title: String,
  slug: String,
  categorySlug: String, // ارتباط با دسته
  order: Number,
});

module.exports = mongoose.model("SubCategory", SubCategorySchema);
