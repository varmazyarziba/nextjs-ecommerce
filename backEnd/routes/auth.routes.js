const express = require("express");
const router = express.Router();

const {
  sendOtp,
  verifyOtp,
  getMe,
  logout,
} = require("../controllers/auth.controller");

const {
  protect,
} = require("../middlewares/auth.middleware");

/**
 * ارسال کد تایید
 */
router.post("/send-otp", sendOtp);

/**
 * تایید کد
 */
router.post("/verify-otp", verifyOtp);

/**
 * اطلاعات کاربر لاگین شده
 */
router.get("/me", protect, getMe);

/**
 * خروج
 */
router.post("/logout", protect, logout);

module.exports = router;