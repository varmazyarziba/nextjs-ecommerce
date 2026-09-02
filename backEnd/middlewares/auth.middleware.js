const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

/**
 * محافظت از مسیرهای کاربران
 */
const protect = async (req, res, next) => {
  try {

    let token = null;

    // --------------------------
    // Cookie
    // --------------------------
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // --------------------------
    // Authorization Header
    // --------------------------
    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "ابتدا وارد حساب کاربری شوید.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded._id).select(
      "-otp -otpExpires -password"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "کاربر پیدا نشد.",
      });
    }

    req.user = user;

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: "توکن نامعتبر است.",
    });

  }
};

/**
 * فقط ادمین
 */
const adminOnly = (req, res, next) => {

  if (
    req.user.role !== "admin" &&
    req.user.role !== "superadmin"
  ) {
    return res.status(403).json({
      success: false,
      message: "دسترسی غیر مجاز",
    });
  }

  next();

};

module.exports = {
  protect,
  adminOnly,
};