const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/databaseConfig");

const Workspace = sequelize.define(
  "Workspace",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "workspaces",
  }
);

module.exports = Workspace;