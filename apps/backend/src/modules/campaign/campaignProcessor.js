const logger = require("../../config/loggerConfig");
const {
    Campaign,
    Audience,
    Contact,
} = require("../../database/models");
const AppError = require("../../utils/appError");
const { buildWhereClause } = require("../audience/filterEngine");
const { sendCampaignEmails } = require("./campaignEmailService");

const processCampaign = async (jobData) => {
    const { campaignId, workspaceId } = jobData;

    let campaign;

    try {
        logger.info(`Processing campaign ${campaignId}`);

        campaign = await Campaign.findOne({
            where: {
                id: campaignId,
                workspaceId,
            },
            include: [
                {
                    model: Audience,
                },
            ],
        });

        if (!campaign) {
            throw new AppError("Campaign not found", 404);
        }

        logger.info(
            `Campaign "${campaign.name}" loaded successfully`
        );

        if (
            ["processing", "sent", "failed"].includes(
                campaign.status
            )
        ) {
            logger.warn(
                `Campaign ${campaign.id} is already in '${campaign.status}' state`
            );
            return;
        }

        await campaign.update({
            status: "processing",
        });

        logger.info(
            `Campaign ${campaign.id} marked as processing`
        );

        const whereClause = buildWhereClause(
            campaign.Audience.filters
        );

        whereClause.workspaceId = workspaceId;

        const contacts = await Contact.findAll({
            where: whereClause,
        });

        logger.info(
            `Found ${contacts.length} contacts for campaign ${campaign.id}`
        );

        if (!contacts.length) {
            logger.warn(
                `No contacts found for campaign ${campaign.id}`
            );

            await campaign.update({
                status: "sent",
                sentAt: new Date(),
            });

            return;
        }

        const { successCount, failureCount } =
            await sendCampaignEmails(campaign, contacts);

        logger.info(
            `Campaign ${campaign.id}: ${successCount} sent, ${failureCount} failed`
        );

        await campaign.update({
            status:
                failureCount === contacts.length
                    ? "failed"
                    : "sent",
            sentAt: new Date(),
        });

        logger.info(
            `Campaign ${campaign.id} processing completed`
        );
    } catch (error) {
        logger.error(error);

        if (campaign) {
            try {
                await campaign.update({
                    status: "failed",
                });
            } catch (updateError) {
                logger.error(
                    `Failed to update campaign status: ${updateError.message}`
                );
            }
        }

        throw error;
    }
};

module.exports = {
    processCampaign,
};