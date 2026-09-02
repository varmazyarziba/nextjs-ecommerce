const Product = require("../models/Product.model");
const slugify = require("slugify");
const Category = require("../models/Category.model");

const buildCategoryPath = async (categoryId) => {
  const path = [];

  let current = await Category.findById(categoryId);

  while (current) {
    path.unshift(current.title);

    if (!current.parent) break;

    current = await Category.findById(current.parent);
  }

  return path.join(" / ");
};

exports.createProduct = async (req, res) => {
  try {
    let slug = slugify(req.body.title, {
      lower: true,
      strict: true,
      locale: "fa",
    });

    // جلوگیری از تکراری بودن اسلاگ
    const existing = await Product.findOne({ slug });

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const product = await Product.create({
      ...req.body,
      slug,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/**
 * 📦 لیست محصولات (با فیلتر)
 * query:
 * ?category=slug
 * ?search=arduino
 */
exports.getProducts = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // دریافت همه دسته‌ها فقط یک بار
    const categories = await Category.find().lean();

    // ساخت Map برای دسترسی سریع
    const categoryMap = {};

    categories.forEach((cat) => {
      categoryMap[cat._id.toString()] = cat;
    });

    // تابع ساخت مسیر دسته
    const getCategoryPath = (categoryId) => {
      const path = [];

      let current = categoryMap[categoryId.toString()];

      while (current) {
        path.unshift(current.title);

        if (!current.parent) break;

        current = categoryMap[current.parent.toString()];
      }

      return path.join(" / ");
    };

    const products = await Product.find(filter)
      .populate("category", "title slug parent")
      .sort({ createdAt: -1 })
      .lean();

    const result = products.map((product) => ({
      ...product,
      categoryPath: getCategoryPath(product.category._id),
    }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * 🔍 دریافت محصول با slug
 */
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category", "title slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // افزایش بازدید
    product.views += 1;
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✏️ ویرایش محصول
 */
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🗑 حذف محصول
 * (بهتره soft delete باشه)
 */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Product deactivated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
