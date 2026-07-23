const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const campaignController = require("./campaignController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", campaignController.createCampaign);

router.get("/", campaignController.getAllCampaigns);

router.post("/:campaignId/duplicate",campaignController.duplicateCampaignController);

router.get("/:campaignId", campaignController.getCampaignById);

router.patch("/:campaignId", campaignController.updateCampaign);

router.delete("/:campaignId", campaignController.deleteCampaign);


module.exports = router;