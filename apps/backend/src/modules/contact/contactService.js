const { Contact } = require("../../database/models");
const AppError = require("../../utils/appError");

const createContact = async (workspaceId, data) => {
  const existingContact = await Contact.findOne({
    where: {
      workspaceId,
      email: data.email,
    },
  });

  if (existingContact) {
    throw new AppError("Contact with this email already exists", 409);
  }

  return await Contact.create({
    workspaceId,
    ...data,
  });
};

const getAllContacts = async (workspaceId) => {
  return await Contact.findAll({
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

const updateContact = async (workspaceId, contactId, data) => {
  const contact = await getContactById(workspaceId, contactId);

  if (data.email && data.email !== contact.email) {
    const existingContact = await Contact.findOne({
      where: {
        workspaceId,
        email: data.email,
      },
    });

    if (existingContact) {
      throw new AppError("Contact with this email already exists", 409);
    }
  }

  await contact.update(data);

  return contact;
};

const deleteContact = async (workspaceId, contactId) => {
  const contact = await getContactById(workspaceId, contactId);

  await contact.destroy();

  return;
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
};