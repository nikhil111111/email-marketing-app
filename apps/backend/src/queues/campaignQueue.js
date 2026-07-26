/**
 * Purpose:
 * Creates the BullMQ queue used for background email processing.
 *
 * Responsibilities:
 * - Store campaign jobs
 * - Configure retry attempts
 * - Configure exponential backoff
 * - Persist jobs in Redis
 *
 * Called By:
 * campaign.service.js
 *
 * Processed By:
 * campaignWorker.js
 *
 * Flow:
 * Service → Queue → Worker
 */

const { Queue } = require("bullmq");
const redis = require("../config/redis");

const campaignQueue = new Queue("campaign-email-queue", {
    connection: redis,
    defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 100,
        removeOnFail: 100,
        backoff: {
            type: "exponential",
            delay: 5000,
        },
    },
});

module.exports = campaignQueue;