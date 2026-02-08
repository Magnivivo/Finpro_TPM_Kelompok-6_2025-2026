const { signToken, verifyToken } = require("../config/jwt.config")

module.exports = {
    generateToken: (payload) => signToken(payload),
    decodeToken: (token) => verifyToken(token),
};