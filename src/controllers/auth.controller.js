const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "TPM_BNCC_nyawit_Activist";

// ================= REGISTER =================
// Register a new USER (not team - user can join team later)
const register = async (req, res) => {
  try {
    const {
      Name,      // User's name (used as username too)
      email,
      password,
      confirmPassword,
      isBinusian,
      whatsapp,
      lineId,
      birthPlace,
      birthDate
    } = req.body;

    // Get file paths from multer upload
    const cvPath = req.files?.cv?.[0]?.filename || '';
    const idCardPath = req.files?.idCard?.[0]?.filename || '';

    // Basic validation
    if (!Name || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: "Field wajib belum lengkap" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password tidak sesuai" });
    }

    // Password validation
    if (password.length < 8)
      return res.status(400).json({ error: "Password minimal 8 karakter" });
    if (!/[A-Z]/.test(password))
      return res.status(400).json({ error: "Password harus ada huruf besar" });
    if (!/[a-z]/.test(password))
      return res.status(400).json({ error: "Password harus ada huruf kecil" });
    if (!/[0-9]/.test(password))
      return res.status(400).json({ error: "Password harus ada angka" });
    if (!/[!@#$%^&*]/.test(password))
      return res.status(400).json({ error: "Password harus ada simbol" });

    // Check if user already exists (email, whatsapp, lineId must be unique)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { Whatsapp: whatsapp },
          { LineID: lineId }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email, WhatsApp, atau Line ID sudah terdaftar" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (without team - teamId is null)
    const newUser = await prisma.user.create({
      data: {
        Name,
        email,
        password: hashedPassword,
        isBinusian: isBinusian === true || isBinusian === 'true',
        Whatsapp: whatsapp,
        LineID: lineId,
        birthPlace: birthPlace || '',
        birthDate: birthDate ? new Date(birthDate) : new Date(),
        cvPath: cvPath || '',
        idCardPath: idCardPath || ''
        // teamId is null by default - user joins team later
      }
    });

    // Remove password from response
    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      message: "Registrasi berhasil",
      data: safeUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

// ================= LOGIN =================
// Login with email and password
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email dan password wajib" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { team: true }  // Include team info if user has joined a team
    });

    if (!user) {
      return res.status(401).json({ error: "User tidak ditemukan" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password salah" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        Name: user.Name,
        teamId: user.teamId,
        isLeader: user.isLeader
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        userId: user.userId,
        Name: user.Name,
        email: user.email,
        hasTeam: !!user.teamId,
        teamName: user.team ? user.team.teamName : null
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal login: " + error.message });
  }
};

// ================= LOGOUT =================
const logout = async (req, res) => {
  res.json({ message: "Logout sukses" });
};

// ================= ME =================
// Get current user info from JWT token
const me = async (req, res) => {
  try {
    // req.user is set by auth middleware (contains decoded JWT)
    const user = await prisma.user.findUnique({
      where: { userId: req.user.userId },
      include: { team: true },
      select: {
        userId: true,
        Name: true,
        email: true,
        isBinusian: true,
        Whatsapp: true,
        LineID: true,
        birthPlace: true,
        birthDate: true,
        teamId: true,
        team: {
          select: {
            teamId: true,
            teamName: true,
            Leader: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data user: " + error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  me
};
