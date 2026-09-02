module.exports = function (req, res, next) {
  const user = req.user; // از توکن گرفته میشه

  if (!user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  if (user.role !== "admin" && user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};
