const { sequelize } = require("../../config/databaseConfig");

const Workspace = require("./workspaceModel");
const User = require("./userModel");
const Contact = require("./contactModel");
const Audience = require("./audienceModel");
const Campaign = require("./campaignModel");

/* ===========================
   Workspace Associations
=========================== */

Workspace.hasMany(User, {
  foreignKey: "workspaceId",
});
User.belongsTo(Workspace, {
  foreignKey: "workspaceId",
});

Workspace.hasMany(Contact, {
  foreignKey: "workspaceId",
});
Contact.belongsTo(Workspace, {
  foreignKey: "workspaceId",
});

Workspace.hasMany(Audience, {
  foreignKey: "workspaceId",
});
Audience.belongsTo(Workspace, {
  foreignKey: "workspaceId",
});

Workspace.hasMany(Campaign, {
  foreignKey: "workspaceId",
});
Campaign.belongsTo(Workspace, {
  foreignKey: "workspaceId",
});

/* ===========================
   Audience Associations
=========================== */

Audience.hasMany(Campaign, {
  foreignKey: "audienceId",
});
Campaign.belongsTo(Audience, {
  foreignKey: "audienceId",
});

/* ===========================
   Database Sync
=========================== */

const syncDatabase = async () => {
  try {
    await sequelize.sync({
      alter: true,
    });

    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Database synchronization failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  Workspace,
  User,
  Contact,
  Audience,
  Campaign,
  syncDatabase,
};