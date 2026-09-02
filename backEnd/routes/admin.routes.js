const express = require("express");
const controller= require("../controllers/admin.controllers");

const router = express.Router();

router.post("/loginAdmin", controller.loginAdmin);
router.post("/create-admin",controller.createAdmin);
router.get("/test", (req, res) => {
  res.send("ADMIN ROUTE WORKS");
});
module.exports = router;