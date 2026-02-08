const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "TPM_BNCC_nyawit_Activist";

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const {
      groupName,
      password,
      confirmPassword,
      binusian,
      fullName,
      email,
      whatsapp,
      lineId,
      githubId,
      birthPlace,
      birthDate
    } = req.body;

    // basic validation
    if (!groupName || !password || !confirmPassword || !email) {
      return res.status(400).json({ error: "Field wajib belum lengkap" });
    }

    if (password !== confirmPassword)
      return res.status(400).json({ error: "Password tidak sesuai" });

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

    const existingData = await prisma.team.findFirst({
      where: {
        OR: [
          { email },
          { whatsapp },
          { lineId },
          { groupName }
        ]
      }
    });

    if (existingData) {
      return res.status(400).json({ error: "Data sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeam = await prisma.team.create({
      data: {
        groupName,
        password: hashedPassword,
        binusian: binusian === true || binusian === 'true',
        fullName,
        email,
        whatsapp,
        lineId,
        githubId,
        birthPlace,
        birthDate: birthDate ? new Date(birthDate) : null
      }
    });

    const { password: _, ...safeTeam } = newTeam;

    res.status(201).json({
      message: "Registrasi berhasil",
      data: safeTeam
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { groupName, password } = req.body;

    if (!groupName || !password) {
      return res.status(400).json({ error: "Group name dan password wajib" });
    }

    const team = await prisma.team.findUnique({
      where: { groupName }
    });

    if (!team) {
      return res.status(401).json({ error: "Tim tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, team.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign(
      { teamId: team.id, groupName: team.groupName },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: "Login berhasil",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal login" });
  }
};

// ================= LOGOUT =================
const logout = async (req, res) => {
  res.json({ message: "Logout sukses" });
};

// ================= ME =================
const me = async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.user.teamId },
      select: {
        id: true,
        groupName: true,
        email: true
      }
    });

    if (!team) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    res.json(team);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal mengambil data user" });
  }
};

module.exports = {
  register,
  login,
  logout,
  me
};
