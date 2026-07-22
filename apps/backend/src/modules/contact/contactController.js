const {
    createContactSchema,
    updateContactSchema,
} = require("./contactValidation");

const contactService = require("./contactService");

const createContact = async (req, res, next) => {
    try {
        const data = createContactSchema.parse(req.body);

        const { name, email, phone, ...customFields } = data;

        const contact = await contactService.createContact(
            req.user.workspaceId,
            {
                name,
                email,
                phone,
                customFields,
            }
        );

        return res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await contactService.getAllContacts(
            req.user.workspaceId
        );

        return res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contact = await contactService.getContactById(
            req.user.workspaceId,
            req.params.contactId
        );

        return res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

const updateContact = async (req, res, next) => {
    try {
        const data = updateContactSchema.parse(req.body);

        const { name, email, phone, ...customFields } = data;

        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;

        if (Object.keys(customFields).length) {
            updateData.customFields = customFields;
        }

        const contact = await contactService.updateContact(
            req.user.workspaceId,
            req.params.id,
            updateData
        );

        return res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

const deleteContact = async (req, res, next) => {
    try {
        await contactService.deleteContact(
            req.user.workspaceId,
            req.params.contactId
        );

        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact,
};