const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    mongoURI: process.env.MONGO_DB_URI,
    nodeENV: process.env.NODE_ENV,
    port: process.env.PORT,
    otpLength: process.env.OTP_LENGTH_KEY,
    jwtSecret: process.env.JWT_SECRET,
    sendgridAPIKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.WINDYCRAFT_FROM_EMAIL_KEY,
    cryptoEncryptionKey: process.env.CRYPTO_JS_ENCRYPT_KEY
};
