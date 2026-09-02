// const User = require("../models/User.model");
// const jwt = require("jsonwebtoken");

// // sendOtp

// exports.sendOtp = async (req, res) => {
//   const { phone } = req.body;

//   const code = Math.floor(100000 + Math.random() * 900000).toString();

//   let user = await User.findOne({ phone });

//   if (!user) {
//     user = await User.create({ phone });
//   }

//   user.otp = code;
//   user.otpExpires = Date.now() + 2 * 60 * 1000;
//   await user.save();

//   // sendSms(phone, code)
//   console.log("OTP:", code);

//   res.json({ isNewUser: !user.firstName });
// };
// // verifyOtp 
// exports.verifyOtp = async (req, res) => {
//   const { phone, code, firstName, lastName } = req.body;

//   const user = await User.findOne({ phone });

//   if (!user || user.otp !== code || user.otpExpires < Date.now()) {
//     return res.status(400).json({ message: "کد نامعتبر است" });
//   }

//   if (!user.firstName && firstName) {
//     user.firstName = firstName;
//     user.lastName = lastName;
//   }

//   user.otp = null;
//   user.otpExpires = null;
//   await user.save();

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.json({ token, user });
// };
// auth.controller.js