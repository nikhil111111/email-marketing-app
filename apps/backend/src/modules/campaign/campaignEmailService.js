/**
 * Campaign Email Service
 *
 * Purpose:
 * Sends campaign emails to all matching contacts.
 *
 * Responsibilities:
 * - Iterate through campaign recipients
 * - Send email using emailService
 * - Attach campaign files
 * - Count successful emails
 * - Count failed emails
 * - Log delivery failures
 *
 * Called By:
 * campaignProcessor.js
 *
 * Calls:
 * emailService.sendEmail()
 *
 * This service focuses only on email delivery.
 */

const { sendEmail } = require("../../services/emailService");
const logger = require("../../config/loggerConfig");

const BATCH_SIZE = 25;
const BATCH_DELAY = 1000;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendCampaignEmails = async (campaign, contacts) => {
    let successCount = 0;
    let failureCount = 0;

    // Process contacts in controlled batches to improve throughput
    //while avoiding SMTP rate limits.    
    for (let i = 0; i < contacts.length; i += BATCH_SIZE) {
        const batch = contacts.slice(i, i + BATCH_SIZE);

        await Promise.all(
            batch.map(async (contact) => {
                try {
                    await sendEmail({
                        to: contact.email,
                        subject: campaign.subject,
                        html: campaign.htmlContent,
                        attachments: campaign.attachmentPath
                            ? [
                                {
                                    filename:
                                        campaign.attachmentName,
                                    path: campaign.attachmentPath,
                                    contentType:
                                        campaign.attachmentMimeType,
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
            })
        );

        logger.info(
            `Batch ${Math.floor(i / BATCH_SIZE) + 1} completed (${Math.min(
                i + BATCH_SIZE,
                contacts.length
            )}/${contacts.length} emails processed)`
        );

        if (i + BATCH_SIZE < contacts.length) {
            await delay(BATCH_DELAY);
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