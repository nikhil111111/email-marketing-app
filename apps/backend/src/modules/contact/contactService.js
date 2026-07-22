const { Op } = require("sequelize");

const { Contact } = require("../../database/models");
const AppError = require("../../utils/appError");

const createContact = async (workspaceId, data) => {
  const existingContact = await Contact.findOne({
    where: {
      workspaceId,
      [Op.or]: [
        { email: data.email },
        ...(data.phone ? [{ phone: data.phone }] : []),
      ],
    },
  });

  if (existingContact) {
    if (existingContact.email === data.email) {
      throw new AppError(
        "Contact with this email already exists",
        409
      );
    }

    if (data.phone && existingContact.phone === data.phone) {
      throw new AppError(
        "Contact with this phone number already exists",
        409
      );
    }
  }

  return Contact.create({
    workspaceId,
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    customFields: data.customFields || {},
  });
};

const getAllContacts = async (workspaceId) => {
  return Contact.findAll({
    where: { workspaceId },
    order: [["createdAt", "DESC"]],
  });
};

const getContactById = async (workspaceId, contactId) => {
  const contact = await Contact.findOne({
    where: {
      id: contactId,
      workspaceId,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  return contact;
};

const updateContact = async (
  workspaceId,
  contactId,
  data
) => {
  const contact = await getContactById(
    workspaceId,
    contactId
  );

  if (data.email || data.phone) {
    const duplicate = await Contact.findOne({
      where: {
        workspaceId,
        id: {
          [Op.ne]: contactId,
        },
        [Op.or]: [
          ...(data.email ? [{ email: data.email }] : []),
          ...(data.phone ? [{ phone: data.phone }] : []),
        ],
      },
    });

    if (duplicate) {
      throw new AppError(
        "Email or phone already exists",
        409
      );
    }
  }

  await contact.update({
    ...data,
    customFields:
      data.customFields ?? contact.customFields,
  });

  return contact;
};

const deleteContact = async (
  workspaceId,
  contactId
) => {
  const contact = await getContactById(
    workspaceId,
    contactId
  );

  await contact.destroy();
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};