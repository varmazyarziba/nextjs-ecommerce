const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
router.get("/test", (req, res) => {
  res.json({ message: "upload route works" });
});
router.post(
  "/products",
  upload.array("images", 10),
  (req, res) => {

    const imageUrls = req.files.map(
      file =>
        `http://localhost:5000/upload/products/${file.filename}`
    );

    res.json(imageUrls);
  }
);

module.exports = router;