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

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
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

    status: {
      type: DataTypes.ENUM("subscribed", "unsubscribed"),
      allowNull: false,
      defaultValue: "subscribed",
    },
  },
  {
    tableName: "contacts",
    indexes: [
      {
        unique: true,
        fields: ["workspace_id", "email"],
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