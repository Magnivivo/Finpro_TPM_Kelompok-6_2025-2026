// utility tambahan untuk fingsi upload CV and ID

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    }, 
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error("Format file tidak didukung"), false);
    }
    cb(null, true);
};

const upload = multer({storage, fileFilter});

module.exports = upload;