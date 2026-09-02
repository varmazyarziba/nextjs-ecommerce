const express = require("express");
const router = express.Router();

const controller = require("../controllers/orders.controller");
const { protect, adminOnly } = require("../middlewares/auth.middleware");

// کاربر
router.post("/", protect, controller.createOrder);
router.get("/my", protect, controller.getMyOrders);

// ادمین
router.get("/", protect, adminOnly, controller.getAllOrders);
router.put("/:id/status", protect, adminOnly, controller.updateOrderStatus);

module.exports = router;
