const { sequelize } = require("../../config/databaseConfig");

const Workspace = require("./workspaceModel");
const User = require("./userModel");

const syncDatabase = async () => {
  try {
    await sequelize.sync({
      alter: true,
    });

    console.log("✅ Database synchronized successfully");
  } catch (error) {
    console.error("❌ Database synchronization failed");
    console.error(error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  Workspace,
  User,
  syncDatabase,
};