const { Campaign, Audience } = require("../../database/models");
const AppError = require("../../utils/appError");
const campaignQueue = require("../../queues/campaignQueue");

const enqueueCampaign = async (campaign) => {
    const delay =
        campaign.scheduledAt &&
        new Date(campaign.scheduledAt) > new Date()
            ? new Date(campaign.scheduledAt).getTime() - Date.now()
            : 0;

    const existingJob = await campaignQueue.getJob(
        `campaign-${campaign.id}`
    );

    if (existingJob) {
        await existingJob.remove();
    }

    await campaignQueue.add(
        "send-campaign",
        {
            campaignId: campaign.id,
            workspaceId: campaign.workspaceId,
        },
        {
            jobId: `campaign-${campaign.id}`,
            delay,
            attempts: 3,
            removeOnComplete: true,
            removeOnFail: false,
        }
    );
};

const createCampaign = async (workspaceId, data) => {
    const audience = await Audience.findOne({
        where: {
            id: data.audienceId,
            workspaceId,
        },
    });

    if (!audience) {
        throw new AppError("Audience not found", 404);
    }

    const existingCampaign = await Campaign.findOne({
        where: {
            workspaceId,
            name: data.name,
        },
    });

    if (existingCampaign) {
        throw new AppError("Campaign name already exists", 409);
    }

    const campaign = await Campaign.create({
        workspaceId,
        ...data,
        status: data.scheduledAt ? "scheduled" : "draft",
    });

    if (campaign.status === "scheduled") {
        await enqueueCampaign(campaign);
    }

    return campaign;
};

const getAllCampaigns = async (workspaceId) => {
    return Campaign.findAll({
        where: {
            workspaceId,
        },
        include: [
            {
                model: Audience,
                attributes: ["id", "name"],
            },
        ],
        order: [["createdAt", "DESC"]],
    });
};

const getCampaignById = async (
    workspaceId,
    campaignId
) => {
    const campaign = await Campaign.findOne({
        where: {
            id: campaignId,
            workspaceId,
        },
        include: [
            {
                model: Audience,
                attributes: ["id", "name"],
            },
        ],
    });

    if (!campaign) {
        throw new AppError("Campaign not found", 404);
    }

    return campaign;
};

const updateCampaign = async (
    workspaceId,
    campaignId,
    data
) => {
    const campaign = await getCampaignById(
        workspaceId,
        campaignId
    );

    if (data.audienceId) {
        const audience = await Audience.findOne({
            where: {
                id: data.audienceId,
                workspaceId,
            },
        });

        if (!audience) {
            throw new AppError("Audience not found", 404);
        }
    }

    await campaign.update({
        ...data,
        status: data.scheduledAt
            ? "scheduled"
            : campaign.status,
    });

    if (campaign.status === "scheduled") {
        await enqueueCampaign(campaign);
    }

    return campaign;
};

const deleteCampaign = async (
    workspaceId,
    campaignId
) => {
    const campaign = await getCampaignById(
        workspaceId,
        campaignId
    );

    const existingJob = await campaignQueue.getJob(
        `campaign-${campaign.id}`
    );

    if (existingJob) {
        await existingJob.remove();
    }

    await campaign.destroy();
};

const duplicateCampaign = async (
    workspaceId,
    campaignId
) => {
    const campaign = await getCampaignById(
        workspaceId,
        campaignId
    );

    const existingNames = await Campaign.count({
        where: {
            workspaceId,
            name: {
                [require("sequelize").Op.like]: `${campaign.name}%`,
            },
        },
    });

    const duplicatedCampaign = await Campaign.create({
        workspaceId,
        audienceId: campaign.audienceId,
        name: `${campaign.name} (Copy${existingNames ? ` ${existingNames}` : ""})`,
        subject: campaign.subject,
        htmlContent: campaign.htmlContent,
        status: "draft",
        scheduledAt: null,
        sentAt: null,
    });

    return duplicatedCampaign;
};

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    enqueueCampaign,
    duplicateCampaign
};