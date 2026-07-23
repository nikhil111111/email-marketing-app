const campaignService = require("./campaignService");
const {
  campaignSchema,
  updateCampaignSchema,
} = require("./campaignValidation");

const createCampaign = async (req, res, next) => {
  try {
    const data = campaignSchema.parse(req.body);

    const campaign = await campaignService.createCampaign(
      req.user.workspaceId,
      data
    );

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await campaignService.getAllCampaigns(
      req.user.workspaceId
    );

    return res.status(200).json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    next(error);
  }
};

const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await campaignService.getCampaignById(
      req.user.workspaceId,
      req.params.campaignId
    );

    return res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

const updateCampaign = async (req, res, next) => {
  try {
    const data = updateCampaignSchema.parse(req.body);

    const campaign = await campaignService.updateCampaign(
      req.user.workspaceId,
      req.params.campaignId,
      data
    );

    return res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCampaign = async (req, res, next) => {
  try {
    await campaignService.deleteCampaign(
      req.user.workspaceId,
      req.params.campaignId
    );

    return res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const duplicateCampaignController = async (req,res,next) => {
    try {
        const campaign = await campaignService.duplicateCampaign(
            req.user.workspaceId,
            req.params.campaignId
        );

        return res.status(201).json({
            success: true,
            message: "Campaign duplicated successfully",
            data: campaign,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  duplicateCampaignController,
};