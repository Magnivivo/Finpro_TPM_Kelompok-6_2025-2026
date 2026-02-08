const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5500, 
    JWT_SECRET: process.env.JWT_SECRET || "TPM_BNCC_nyawit_Activist",
};