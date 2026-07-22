const express = require("express");

const contactController = require("./contactController");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

// Protect all contact routes
router.use(authMiddleware);

// Create Contact
router.post("/", contactController.createContact);

// Get All Contacts
router.get("/", contactController.getAllContacts);

// Get Contact By ID
router.get("/:contactId", contactController.getContactById);

// Update Contact
router.put("/:contactId", contactController.updateContact);

// Delete Contact
router.delete("/:contactId", contactController.deleteContact);

module.exports = router;