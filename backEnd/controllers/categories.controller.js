const Category = require("../models/Category.model");
const slugify = require("slugify");
const Product = require("../models/Product.model");

/**
 * ➕ ایجاد دسته
 */
exports.createCategory = async (req, res) => {
  try {
    const { title, parent, order } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    let slug = slugify(title, {
      lower: true,
      strict: true,
      locale: "fa",
    });

    const existingSlug = await Category.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    let level = 0;

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({ message: "Parent not found" });
      }

      if (parentCategory.level >= 2) {
        return res.status(400).json({
          message: "بیشتر از 3 سطح مجاز نیست",
        });
      }

      level = parentCategory.level + 1;
    }

    const category = await Category.create({
      title,
      slug,
      parent: parent || null,
      level,
      order: order || 0,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 📦 دریافت دسته‌ها (پشتیبانی از فیلتر parent)
 * GET /api/categories
 * GET /api/categories?parent=ID
 */
exports.getAllCategories = async (req, res) => {
  try {
    const { parent } = req.query;

    let filter = {};

    if (parent) {
      filter.parent = parent;
    } else {
      filter.parent = null; // فقط دسته‌های اصلی
    }

    const categories = await Category.find(filter)
      .populate("parent", "title level")
      .sort({ order: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🌳 دریافت دسته‌ها به صورت درختی (برای منو سایت)
 */
exports.getCategoryTree = async (req, res) => {
  try {
    const categories = await Category.find()
      .sort({ order: 1 })
      .lean();

    const buildTree = (parentId = null) =>
      categories
        .filter(cat =>
          parentId === null
            ? cat.parent === null
            : cat.parent?.toString() === parentId.toString()
        )
        .map(cat => ({
          ...cat,
          children: buildTree(cat._id),
        }));

    res.json(buildTree());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔍 دریافت یک دسته با id
 */
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate("parent", "title level");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




/**
 * 🔍 دریافت یک دسته با slug
 */
exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate("parent", "title");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ✏️ ویرایش دسته
 */
exports.updateCategory = async (req, res) => {
  try {
    const { title, parent, order, isActive } = req.body;
    const categoryId = req.params.id;

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (parent && parent.toString() === categoryId) {
      return res.status(400).json({
        message: "دسته نمی‌تواند والد خودش باشد",
      });
    }

    let level = 0;

    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(404).json({ message: "Parent not found" });
      }

      if (parentCategory.level >= 2) {
        return res.status(400).json({
          message: "بیشتر از 3 سطح مجاز نیست",
        });
      }

      level = parentCategory.level + 1;
    }

    let slug = existingCategory.slug;
    if (title && title !== existingCategory.title) {
      slug = slugify(title, {
        lower: true,
        strict: true,
        locale: "fa",
      });

      const duplicate = await Category.findOne({ slug });
      if (duplicate && duplicate._id.toString() !== categoryId) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      {
        title,
        slug,
        parent: parent || null,
        level,
        order: order ?? existingCategory.order,
        isActive:
          typeof isActive === "boolean"
            ? isActive
            : existingCategory.isActive,
      },
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🗑 حذف دسته
 */
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const hasChildren = await Category.findOne({ parent: categoryId });
    if (hasChildren) {
      return res.status(400).json({
        message: "ابتدا زیرمجموعه‌ها را حذف کنید",
      });
    }

    await Category.findByIdAndDelete(categoryId);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * 📄 اطلاعات کامل صفحه دسته
 * GET /api/categories/page/:slug
 */
exports.getCategoryPage = async (req, res) => {
  try {
    const { slug } = req.params;

    // پیدا کردن دسته
    const category = await Category.findOne({
      slug,
      isActive: true,
    }).lean();

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // تمام دسته‌ها
    const categories = await Category.find({
      isActive: true,
    }).lean();

    /**
     * پیدا کردن همه فرزندان
     */
    const getChildrenIds = (parentId) => {
      let ids = [];

      const children = categories.filter(
        (item) =>
          item.parent &&
          item.parent.toString() === parentId.toString()
      );

      children.forEach((child) => {
        ids.push(child._id);
        ids = ids.concat(getChildrenIds(child._id));
      });

      return ids;
    };

    // زیر دسته‌های مستقیم
    const children = categories.filter(
      (item) =>
        item.parent &&
        item.parent.toString() === category._id.toString()
    );

    // همه شناسه‌ها
    const categoryIds = [
      category._id,
      ...getChildrenIds(category._id),
    ];

    // محصولات
    const products = await Product.find({
      category: {
        $in: categoryIds,
      },
      isActive: true,
    })
      .populate("category", "title slug")
      .lean();

    /**
     * breadcrumb
     */

    const breadcrumb = [];

    let current = category;

    while (current) {
      breadcrumb.unshift({
        title: current.title,
        slug: current.slug,
      });

      if (!current.parent) break;

      current = categories.find(
        (item) =>
          item._id.toString() === current.parent.toString()
      );
    }
const buildFullPath = (cat) => {
  const path = [];

  let current = cat;

  while (current) {
    path.unshift(current.slug);

    if (!current.parent) break;

    current = categories.find(
      (item) =>
        item._id.toString() === current.parent.toString()
    );
  }

  return path.join("/");
};
/**
 * ساخت درخت دسته‌ها
 */
const buildTree = (parent = null) => {
  return categories
    .filter((item) =>
      parent === null
        ? item.parent === null
        : item.parent?.toString() === parent.toString()
    )
    .map((item) => ({
      ...item,
      fullPath: buildFullPath(item),
      children: buildTree(item._id),
    }));
};

const categoryTree = buildTree();


  res.json({
  category: {
    ...category,
    fullPath: buildFullPath(category),
  },

  breadcrumb,

  children: children.map((item) => ({
    ...item,
    fullPath: buildFullPath(item),
  })),

  products,

  categoryTree,
});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};