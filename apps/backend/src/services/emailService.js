/**
 * Email Service
 *
 * Purpose:
 * Centralized service responsible for sending emails using Nodemailer.
 *
 * Responsibilities:
 * - Configure email options
 * - Send emails
 * - Support HTML emails
 * - Support attachments
 *
 * Called By:
 * - campaign.service.js (Test Email)
 * - campaignEmailService.js (Campaign Emails)
 *
 * Keeping all email logic here avoids code duplication.
 */

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