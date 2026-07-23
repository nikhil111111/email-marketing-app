const { transporter } = require("../config/mail");

const sendEmail = async ({
    to,
    subject,
    html,
    attachments = [],
}) => {
    return transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
        attachments,
    });
};

module.exports = {
    sendEmail,
};