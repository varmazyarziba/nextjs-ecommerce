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

    // -----------------------------------------
    // 1) پیدا کردن دسته فعلی
    // -----------------------------------------
    const category = await Category.findOne({
      slug,
      isActive: true,
    }).lean();

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // -----------------------------------------
    // 2) دریافت تمام دسته‌های فعال
    // فقط یک بار از دیتابیس می‌گیریم
    // -----------------------------------------
    const categories = await Category.find({
      isActive: true,
    })
      .sort({ order: 1 })
      .lean();

    // -----------------------------------------
    // 3) ساخت Map برای دسترسی سریع به دسته‌ها
    // -----------------------------------------
    const categoryMap = new Map(
      categories.map((item) => [
        item._id.toString(),
        item,
      ])
    );

    // -----------------------------------------
    // 4) پیدا کردن تمام زیرمجموعه‌های یک دسته
    // -----------------------------------------
    const getChildrenIds = (parentId) => {
      const result = [];

      const findChildren = (currentParentId) => {
        for (const item of categories) {
          if (
            item.parent &&
            item.parent.toString() ===
              currentParentId.toString()
          ) {
            result.push(item._id);
            findChildren(item._id);
          }
        }
      };

      findChildren(parentId);

      return result;
    };

    // -----------------------------------------
    // 5) زیر دسته‌های مستقیم
    // -----------------------------------------
    const children = categories.filter(
      (item) =>
        item.parent &&
        item.parent.toString() ===
          category._id.toString()
    );

    // -----------------------------------------
    // 6) تمام ID های دسته فعلی + زیرمجموعه‌ها
    // -----------------------------------------
    const categoryIds = [
      category._id,
      ...getChildrenIds(category._id),
    ];

    // -----------------------------------------
    // 7) دریافت محصولات این دسته و تمام فرزندان
    // -----------------------------------------
    const products = await Product.find({
      category: {
        $in: categoryIds,
      },
      isActive: true,
    })
      .populate("category", "title slug")
      .sort({ createdAt: -1 })
      .lean();

    // -----------------------------------------
    // 8) ساخت مسیر کامل دسته
    // مثال:
    // mazhwl-43434/mazhwl-1/m-5
    // -----------------------------------------
    const buildFullPath = (cat) => {
      if (!cat) return "";

      const path = [];
      let current = cat;

      while (current) {
        path.unshift(current.slug);

        if (!current.parent) {
          break;
        }

        current = categoryMap.get(
          current.parent.toString()
        );
      }

      return path.join("/");
    };

    // -----------------------------------------
    // 9) ساخت Breadcrumb
    // -----------------------------------------
    const breadcrumb = [];

    let current = category;

    while (current) {
      breadcrumb.unshift({
        title: current.title,
        slug: current.slug,
        fullPath: buildFullPath(current),
      });

      if (!current.parent) {
        break;
      }

      current = categoryMap.get(
        current.parent.toString()
      );
    }

    // -----------------------------------------
    // 10) اضافه کردن fullPath به دسته‌های مستقیم
    // -----------------------------------------
    const childrenWithPath = children.map((item) => ({
      ...item,
      fullPath: buildFullPath(item),
    }));

    // -----------------------------------------
    // 11) اضافه کردن categoryPath به محصولات
    // -----------------------------------------
    const productsWithPath = products.map((product) => {
      const productCategory =
        product.category?._id
          ? categoryMap.get(
              product.category._id.toString()
            )
          : null;

      return {
        ...product,
        categoryPath: buildFullPath(
          productCategory
        ),
      };
    });

    // -----------------------------------------
    // 12) ساخت Category Tree
    // -----------------------------------------
    const buildTree = (parentId = null) => {
      return categories
        .filter((item) => {
          if (parentId === null) {
            return !item.parent;
          }

          return (
            item.parent &&
            item.parent.toString() ===
              parentId.toString()
          );
        })
        .map((item) => ({
          ...item,
          fullPath: buildFullPath(item),
          children: buildTree(item._id),
        }));
    };

    const categoryTree = buildTree();

    // -----------------------------------------
    // 13) محاسبه حداقل و حداکثر قیمت واقعی
    //
    // اگر discountPrice معتبر باشد،
    // قیمت نهایی = discountPrice
    // در غیر این صورت = price
    // -----------------------------------------
    const prices = productsWithPath
      .map((product) => {
        const hasValidDiscount =
          typeof product.discountPrice === "number" &&
          product.discountPrice > 0 &&
          product.discountPrice < product.price;

        return hasValidDiscount
          ? product.discountPrice
          : product.price;
      })
      .filter(
        (price) =>
          typeof price === "number" &&
          Number.isFinite(price) &&
          price >= 0
      );

    const priceRange = {
      min: prices.length
        ? Math.min(...prices)
        : 0,

      max: prices.length
        ? Math.max(...prices)
        : 0,
    };

    // -----------------------------------------
    // 14) پاسخ نهایی
    // -----------------------------------------
    res.json({
      category: {
        ...category,
        fullPath: buildFullPath(category),
      },

      breadcrumb,

      children: childrenWithPath,

      products: productsWithPath,

      categoryTree,

      priceRange,
    });
  } catch (error) {
    console.error(
      "getCategoryPage error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};