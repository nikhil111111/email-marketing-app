/**
 * Purpose:
 * Continuously listens for campaign jobs from BullMQ and processes them.
 *
 * Responsibilities:
 * - Receive queued campaign jobs
 * - Execute campaign processing
 * - Log completed jobs
 * - Log failed jobs
 *
 * Listens To:
 * campaign-email-queue
 *
 * Calls:
 * processCampaign()
 *
 * Flow:
 * Queue → Worker → Campaign Processor
 */

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