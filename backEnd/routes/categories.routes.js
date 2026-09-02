const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categories.controller");

/**
 * ➕ ایجاد دسته یا زیر‌دسته
 */
router.post("/", categoryController.createCategory);

/**
 * 📦 دریافت همه دسته‌ها (خام)
 */
router.get("/", categoryController.getAllCategories);

/**
 * 🌳 دریافت دسته‌ها به صورت درختی (برای منو)
 */
router.get("/tree", categoryController.getCategoryTree);


/**
 * 📄 اطلاعات کامل صفحه دسته
 */
router.get("/page/:slug", categoryController.getCategoryPage);

/**
 * 🔍 دریافت دسته با slug
 */
router.get("/slug/:slug", categoryController.getCategoryBySlug);


/**
 * ✏️ ویرایش دسته
 */
router.put("/:id", categoryController.updateCategory);

/**
 * 🗑 حذف دسته
 */
router.delete("/:id", categoryController.deleteCategory);
router.get(
  "/page/:slug",
  categoryController.getCategoryPage
);

module.exports = router;
