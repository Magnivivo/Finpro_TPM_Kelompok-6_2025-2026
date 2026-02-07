const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const adminRoutes = require("./admin.routes");

router.get("/health", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

module.exports = router;