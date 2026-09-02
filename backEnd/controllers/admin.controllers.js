const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    if (admin.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // کوکی HttpOnly فقط برای سرور
    res.cookie("adminToken", token, {
      httpOnly: true,
      sameSite: "lax", // برای localhost
      secure: false,   // اگر https نیست false بذار
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 روز
    });

    // نیازی نیست token را به فرانت بدهیم

  res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // بررسی اینکه ایمیل قبلاً موجود نباشه
    const adminExists = await User.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // هش کردن پسورد با bcrypt
    const hashedPassword = await bcrypt.hash(password, 5);

    // ساخت ادمین
    const admin = await User.create({
      email,
      password: hashedPassword, // پسورد هش شده ذخیره میشه
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully ✅",
      admin: {
        _id: admin._id,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { loginAdmin,createAdmin}