const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// تبدیل اعداد فارسی به انگلیسی
const normalizeNumber = (str = "") => {
  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
};

/**
 * ارسال OTP
 */
exports.sendOtp = async (req, res) => {
  try {
    let { phone } = req.body;

    phone = normalizeNumber(phone);

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "شماره موبایل الزامی است",
      });
    }

    // ساخت کد
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // پیدا کردن کاربر
    let user = await User.findOne({ phone });

    // اگر وجود نداشت بساز
    if (!user) {
      user = await User.create({
        phone,
      });
    }

    // ذخیره OTP
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 2 * 60 * 1000); // 2 دقیقه

    await user.save();

    console.log("📱", phone);
    console.log("OTP:", otp);

    res.json({
      success: true,

      // فقط برای توسعه
      otp,

      isNewUser:
        !user.firstName || !user.lastName,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "خطای سرور",
    });
  }
};

/**
 * تایید OTP
 */
exports.verifyOtp = async (req, res) => {
  try {
    let {
      phone,
      otp,
      firstName,
      lastName,
    } = req.body;

    phone = normalizeNumber(phone);
    otp = normalizeNumber(otp);

    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "کاربر پیدا نشد",
      });
    }

    if (
      !user.otp ||
      user.otp !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "کد تایید اشتباه است",
      });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "کد منقضی شده است",
      });
    }

    // اولین ورود
    if (!user.firstName && firstName) {
      user.firstName = firstName;
    }

    if (!user.lastName && lastName) {
      user.lastName = lastName;
    }

    user.isVerified = true;

    user.lastLogin = new Date();

    user.otp = null;
    user.otpExpires = null;

    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // بعدا روی هاست true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,

      user: {
        _id: user._id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "خطای سرور",
    });
  }
};

/**
 * اطلاعات کاربر
 */
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-otp -otpExpires -password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

/**
 * خروج
 */
exports.logout = async (req, res) => {
  res.clearCookie("token");

  res.json({
    success: true,
  });
};