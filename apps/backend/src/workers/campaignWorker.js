const { Worker } = require("bullmq");
const redis = require("../config/redis");
const logger = require("../config/loggerConfig");
const {processCampaign} = require("../modules/campaign/campaignProcessor");

const worker = new Worker(
    "campaign-email-queue",
    async (job) => {
       await processCampaign(job.data);

        return {
            success: true,
            campaignId: job.data.campaignId,
        };
    },
    {
        connection: redis,
    }
);

worker.on("completed", (job) => {
    logger.info(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
    logger.error(
        `Job ${job?.id} failed: ${err.message}`
    );
});

module.exports = worker;