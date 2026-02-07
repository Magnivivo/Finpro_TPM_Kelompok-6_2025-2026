// buat file keamanan pemeriksa token JWT

const jwt = require('jsonwebtoken');

//cek key -> in authController
const SECRET_KEY = process.env.JWT_SECRET || "TPM_BNCC_nyawit_Activist";

const authenticateToken = (req, res, next) => {
    //header check authorization
    const authHeader = req.headers['authorization'];

    //pengambilan token dan membuang format bearer
    const token = authHeader && authHeader.split(' ')[1];

    //kick anyone without token -> not login yet
    if (token == null) {
        return res.status(401).json({ "Akses ditolak! Tolong login dahulu."});
    }

    //if not null -> cek keaslian (verifikasi) token
    jwt.verify(token, SECRET_KEY, (err, user) => {

        //if token palsu / expired -> kick (403) forbidden
        if (err) {
            return res.status(403).json({ error: "Token Invalid atau token Kadaluarsa." })
        }

        //token asli-> lanjutkan proses
        req.user = user;

        //lanjut ke controller
        next();
    });
};

module.exports = authenticateToken;