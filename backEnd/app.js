require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const path = require("path");
const uploadRoutes =require("./routes/upload.routes");
const cookieParser = require("cookie-parser");



const connectDB = require("./config/db");

connectDB();
app.use(
  cors({
    origin: "http://localhost:3000", // آدرس فرانت
    credentials: true,               // اجازه ارسال کوکی
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/upload",
  express.static(
    path.join(__dirname, "upload")
  )
);
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin",require("./routes/admin.routes"))
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/orders", require("./routes/orders.routes"));
app.use("/api/upload", uploadRoutes);
app.use(cookieParser());
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
