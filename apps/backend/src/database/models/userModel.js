const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/databaseConfig");
const Workspace = require("./workspaceModel");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    workspaceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Workspace,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
  }
);

Workspace.hasMany(User, {
  foreignKey: "workspaceId",
  as: "users",
});

User.belongsTo(Workspace, {
  foreignKey: "workspaceId",
  as: "workspace",
});

module.exports = User;