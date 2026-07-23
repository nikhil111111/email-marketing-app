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