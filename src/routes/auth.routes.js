//isinya rute /login & /register

const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { uploadRegistration } = require("../utils/upload.util");

// Registration with file upload (CV and ID Card)
// Fields: cv (file), idCard (file), + other form data
router.post("/register", uploadRegistration, authController.register);

router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/me", authMiddleware, authController.me);

module.exports = router;