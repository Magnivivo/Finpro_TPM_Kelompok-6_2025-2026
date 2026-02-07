//logika validasi password (huruf besar, kecil, angka, simbol) .

//setup
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const Secret_Key = process.env.JWT_SECRET || "TPM_BNCC_nyawit_Activist"; //secret key -> di .env

// Register Logic
const register = async (req, res) => {
    try {
        // 1. get (Request Body) regist
        const {
            groupName, password, confirmPassword, binusian,
            fullName, email, whatsapp, lineId, githubId, birthPlace, birthDate
        } = req.body;
        
        //2.  pasword validation
        if (password !== savedPassword) {
            return res.status(400).json({ error: "Password yang dimasukkan tidak sesuai! Masukkan password kembali" });
        }
        if (password.length < 8) return res.status(400).json({ error: "Password minimal memiliki 8 karakter" });
        if (!/[A-Z]/.test(password)) return res.status(400).json({ error: "Password harus memiliki huruf BESAR" });
        if (!/[a-z]/.test(password)) return res.status(400).json({ error: "Password harus memiliki huruf kecil" });
        if (!/[0-9]/.test(password)) return res.status(400).json({ error: "Password harus memiliki angka" });
        if (!/[!@#$%^&*]/.test(password)) return res.status(400).json({ error: "Password harus memiliki simbol" });
    
        //3. Cek kesamaan Data -> unique input (Email, WA, LineID)
        const existingData = await prisma.team.findFirtst({
            where: {
                OR: [{ email: email }, { whatsapp: whatsapp }, { lineId: lineId }, { groupName: groupName }]
            }
        });
    
        if (existingUser) {
            return res.status(400).json({ error: "Nama Tim, Email, WA, atau Line ID sudah terpakai!" });
        }
    
        //4. Password Hashing
        const hashedPassword = await bcrypt.hash(password, 10);
    
        //5. Format in Database
        const TeamReg = await prisma.team.create({
            data: {
                groupName,
                password: hashedPassword,
                binusian: binusian === 'true' || binusian === true,
                fullName,
                email,
                whatsapp,
                lineId,
                githubId,
                birthPlace,
                birthDate: new Date(birthDate), // Convert tanggal
            }
        });
        
        res.status(201).json({ message: "Registrasi Berhasil!", data: newTeam });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Terjadi kesalahan di server." });
    }
};

// Login Logic
const login = async (req, res) => {
  try {
    const { groupName, password } = req.body;

    // 1. Cari Tim berdasarkan Nama
    const team = await prisma.team.findUnique({
      where: { groupName: groupName }
    });

    // 2. Cek apakah tim ada DAN passwordnya cocok
    if (!team) {
      return res.status(401).json({ error: "Tim tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, team.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password salah" });
    }

    // 3. Bikin Token (Tiket Masuk)
    const token = jwt.sign({ teamId: team.id, groupName: team.groupName }, SECRET_KEY, {
      expiresIn: '1d' // Token berlaku 1 hari
    });

    res.json({ message: "Login berhasil", token: token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal login" });
  }
};

//Logout Logic -> following routes 
const logout = async (req, res) => {
    res.json({ message: "Logout sukses" });
};

//me
const me = async (req, res) => {
    try {
        const team = await prisma.team.findUnique({
            where: { id: req.user.teamID },
            select: {
                id: true,
                groupName: true,
                email: true,
            }
        });
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: "Gagal mengambil data user" });
    }
};


// export system
module.exports = {
  register,
  login,
  logout,
  me
};
