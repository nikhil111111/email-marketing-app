const Audience = require("../../database/models/audienceModel");
const AppError = require("../../utils/appError");
const { Contact } = require("../../database/models");
const { buildWhereClause } = require("./filterEngine");

const createAudience = async (workspaceId, data) => {
  const existingAudience = await Audience.findOne({
    where: {
      workspaceId,
      name: data.name,
    },
  });

  if (existingAudience) {
    throw new AppError(
      "Audience with this name already exists",
      409
    );
  }

  return Audience.create({
    workspaceId,
    name: data.name,
    filters: data.filters,
  });
};

const getAllAudiences = async (workspaceId) => {
  const audiences = await Audience.findAll({
    where: { workspaceId },
    order: [["createdAt", "DESC"]],
  });

  return Promise.all(
    audiences.map(async (audience) => {
      const count = await Contact.count({
        where: buildWhereClause(
          workspaceId,
          audience.filters
        ),
      });

      return {
        ...audience.toJSON(),
        contactCount: count,
      };
    })
  );
};

const getAudienceById = async (workspaceId, audienceId) => {
  const audience = await Audience.findOne({
    where: {
      id: audienceId,
      workspaceId,
    },
  });

  if (!audience) {
    throw new AppError("Audience not found", 404);
  }

  return audience;
};

const updateAudience = async (
  workspaceId,
  audienceId,
  data
) => {
  const audience = await getAudienceById(
    workspaceId,
    audienceId
  );

  if (data.name && data.name !== audience.name) {
    const existingAudience = await Audience.findOne({
      where: {
        workspaceId,
        name: data.name,
      },
    });

    if (existingAudience) {
      throw new AppError(
        "Audience with this name already exists",
        409
      );
    }
  }

  await audience.update(data);

  return audience;
};

const deleteAudience = async (
  workspaceId,
  audienceId
) => {
  const audience = await getAudienceById(
    workspaceId,
    audienceId
  );

  await audience.destroy();
};

const getAudienceContacts = async (
  workspaceId,
  audienceId
) => {
  const audience = await getAudienceById(
    workspaceId,
    audienceId
  );

  return Contact.findAll({
    where: buildWhereClause(
      workspaceId,
      audience.filters
    ),
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  createAudience,
  getAllAudiences,
  getAudienceById,
  updateAudience,
  deleteAudience,
  getAudienceContacts,
};