const {
  createAudienceSchema,
  updateAudienceSchema,
} = require("./audienceValidation");

const audienceService = require("./audienceService");

const createAudience = async (req, res, next) => {
  try {
    const data = createAudienceSchema.parse(req.body);

    const audience = await audienceService.createAudience(
      req.user.workspaceId,
      data
    );

    return res.status(201).json({
      success: true,
      message: "Audience created successfully",
      data: audience,
    });
  } catch (error) {
    next(error);
  }
};

const getAllAudiences = async (req, res, next) => {
  try {
    const audiences = await audienceService.getAllAudiences(
      req.user.workspaceId
    );

    return res.status(200).json({
      success: true,
      data: audiences,
    });
  } catch (error) {
    next(error);
  }
};

const getAudienceById = async (req, res, next) => {
  try {
    const audience = await audienceService.getAudienceById(
      req.user.workspaceId,
      req.params.audienceId
    );

    return res.status(200).json({
      success: true,
      data: audience,
    });
  } catch (error) {
    next(error);
  }
};

const updateAudience = async (req, res, next) => {
  try {
    const data = updateAudienceSchema.parse(req.body);

    const audience = await audienceService.updateAudience(
      req.user.workspaceId,
      req.params.audienceId,
      data
    );

    return res.status(200).json({
      success: true,
      message: "Audience updated successfully",
      data: audience,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAudience = async (req, res, next) => {
  try {
    await audienceService.deleteAudience(
      req.user.workspaceId,
      req.params.audienceId
    );

    return res.status(200).json({
      success: true,
      message: "Audience deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAudienceContacts = async (req, res, next) => {
  try {
    const contacts =
      await audienceService.getAudienceContacts(
        req.user.workspaceId,
        req.params.audienceId
      );

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAudience,
  getAllAudiences,
  getAudienceById,
  updateAudience,
  deleteAudience,
  getAudienceContacts
};