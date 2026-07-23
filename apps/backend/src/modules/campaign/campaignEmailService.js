const { sendEmail } = require("../../services/emailService");
const logger = require("../../config/loggerConfig");

const sendCampaignEmails = async (campaign, contacts) => {
    let successCount = 0;
    let failureCount = 0;

    for (const contact of contacts) {
        try {
            await sendEmail({
                to: contact.email,
                subject: campaign.subject,
                html: campaign.htmlContent,
                attachments: campaign.attachmentPath
                    ? [
                        {
                            filename: campaign.attachmentName,
                            path: campaign.attachmentPath,
                            contentType: campaign.attachmentMimeType,
                        },
                    ]
                    : [],
            });

            successCount++;
        } catch (error) {
            failureCount++;

            logger.error(
                `Failed to send email to ${contact.email}: ${error.message}`
            );
        }
    }

    return {
        successCount,
        failureCount,
    };
};

module.exports = {
    sendCampaignEmails,
};