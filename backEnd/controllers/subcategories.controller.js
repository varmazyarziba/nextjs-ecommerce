const SubCategory = require("../models/SubCategory.model");

exports.getAll = async (req, res) => {
  const subCategories = await SubCategory.find().sort({ order: 1 });
  res.json(subCategories);
};

exports.getByCategory = async (req, res) => {
  const subs = await SubCategory.find({
    categorySlug: req.params.categorySlug,
  });
  res.json(subs);
};
