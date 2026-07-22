const express = require("express");

const authMiddleware = require("../../middlewares/authMiddleware");
const audienceController = require("./audienceController");

const router = express.Router();

router.use(authMiddleware);

router.post("/", audienceController.createAudience);

router.get("/", audienceController.getAllAudiences);

router.get(
  "/:audienceId/contacts",
  audienceController.getAudienceContacts
);

router.get("/:audienceId", audienceController.getAudienceById);

router.patch("/:audienceId", audienceController.updateAudience);

router.delete("/:audienceId", audienceController.deleteAudience);

module.exports = router;