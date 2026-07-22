const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/databaseConfig");
const Workspace = require("./workspaceModel");

const Contact = sequelize.define(
  "Contact",
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

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    customFields: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    tableName: "contacts",
    indexes: [
      {
        unique: true,
        fields: ["workspace_id", "email"],
      },
      {
        unique: true,
        fields: ["workspace_id", "phone"],
      },
    ],
  }
);

Workspace.hasMany(Contact, {
  foreignKey: "workspaceId",
  as: "contacts",
});

Contact.belongsTo(Workspace, {
  foreignKey: "workspaceId",
  as: "workspace",
});

module.exports = Contact;