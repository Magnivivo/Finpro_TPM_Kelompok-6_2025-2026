const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables dari .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

// ================= MIDDLEWARE =================
app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // Gunakan http jika belum pakai SSL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('uploads')); // Akses file statis

// ================= ROUTES =================
// Pastikan kamu sudah membuat file-file ini di folder src/routes
const authRoutes = require("./src/routes/auth.routes"); // Sesuaikan nama filenya
const adminRoutes = require("./src/routes/admin.routes"); 
const apiRoutes = require("./src/routes/index"); 

app.use('/api/auth', authRoutes);   // Gunakan router, bukan controller langsung
app.use('/api/admin', adminRoutes);
app.use("/api", apiRoutes);

// ================= RUN SERVER =================
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});