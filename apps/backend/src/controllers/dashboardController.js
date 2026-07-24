const { Contact, Campaign, Audience } = require("../database/models");
const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res, next) => {
  try {
    const workspaceId = req.user.workspaceId;

    const [
      totalContacts,
      totalCampaigns,
      totalAudiences,
      recentCampaigns,
    ] = await Promise.all([
      Contact.count({
        where: { workspaceId },
      }),

      Campaign.count({
        where: { workspaceId },
      }),

      Audience.count({
        where: { workspaceId },
      }),

      Campaign.findAll({
        where: { workspaceId },
        order: [["createdAt", "DESC"]],
        limit: 5,
        attributes: [
          "id",
          "name",
          "status",
          "scheduledAt",
          "createdAt",
        ],
      }),
    ]);

    // Replace these with real analytics later
    const openRate = 48;
    const clickRate = 19;

    return res.json({
      success: true,
      data: {
        totalContacts,
        totalCampaigns,
        totalAudiences,
        openRate,
        clickRate,
        recentCampaigns,
      },
    });
  } catch (error) {
    next(error);
  }
};