const express = require("express");
const router = express.Router();
const controller = require("../controllers/subcategories.controller");

router.get("/", controller.getAll);
router.get("/:categorySlug", controller.getByCategory);

module.exports = router;
