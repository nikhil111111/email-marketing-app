const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const verifyMailer = async () => {
    try {
        await transporter.verify();
        console.log("SMTP Server Connected");
    } catch (error) {
        console.error("SMTP Connection Failed:", error.message);
    }
};

module.exports = {
    transporter,
    verifyMailer,
};