const express = require("express");

const contactController = require("./contactController");
const importController = require("./importController");

const authMiddleware = require("../../middlewares/authMiddleware");
const upload = require("./uploadMiddleware");

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

// CSV Import
router.post(
  "/import",
  upload.single("file"),
  importController.importContacts
);

// CRUD
router.post("/", contactController.createContact);

router.get("/", contactController.getAllContacts);

router.get("/:contactId", contactController.getContactById);

router.put("/:contactId", contactController.updateContact);

router.delete("/:contactId", contactController.deleteContact);

module.exports = router;