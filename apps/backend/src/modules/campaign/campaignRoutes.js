const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const campaignController = require("./campaignController");
const uploadCampaignAttachment = require("../../middlewares/uploadCampaignAttachment");

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/upload-attachment",
    uploadCampaignAttachment.single("attachment"),
    campaignController.uploadCampaignAttachmentController
);

router.post(
    "/upload-attachment",
    uploadCampaignAttachment.single("attachment"),
    campaignController.uploadCampaignAttachmentController
);
router.post("/", campaignController.createCampaign);

router.get("/", campaignController.getAllCampaigns);

router.post("/:campaignId/duplicate", campaignController.duplicateCampaignController);

router.get("/:campaignId", campaignController.getCampaignById);

router.patch("/:campaignId", campaignController.updateCampaign);

router.delete("/:campaignId", campaignController.deleteCampaign);


module.exports = router;