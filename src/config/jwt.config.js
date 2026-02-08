const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./env.config");

const signToken = (payload, expiresIn = "1d") => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn});
};

module.exports = {
    signToken,
    verifyToken,
};