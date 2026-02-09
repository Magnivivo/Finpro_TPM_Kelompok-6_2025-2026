// utility tambahan untuk fungsi upload CV and ID

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Format: userId_fieldname_timestamp.ext
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error("Format file tidak didukung. Gunakan JPEG, PNG, atau PDF."), false);
        return;
    }
    cb(null, true);
};

// Max file size: 5MB
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

// Middleware for registration uploads (CV and ID Card)
const uploadRegistration = upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'idCard', maxCount: 1 }
]);

module.exports = { upload, uploadRegistration };