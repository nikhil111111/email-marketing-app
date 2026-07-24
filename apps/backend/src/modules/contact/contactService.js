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

const getAllContacts = async (workspaceId,{
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    order = "DESC",
  }
) => {
  const offset = (page - 1) * limit;

  const where = {
    workspaceId,
  };

  if (search) {
    where[Op.or] = [
      {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        email: {
          [Op.iLike]: `%${search}%`,
        },
      },
      {
        phone: {
          [Op.iLike]: `%${search}%`,
        },
      },
    ];
  }

  const allowedSortFields = [
    "name",
    "email",
    "phone",
    "createdAt",
  ];

  const finalSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const { rows, count } =
    await Contact.findAndCountAll({
      where,
      offset,
      limit,
      order: [[finalSortBy, order]],
    });

  return {
    contacts: rows,

    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    },
  };
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