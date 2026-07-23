const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/databaseConfig");

const Campaign = sequelize.define(
  "Campaign",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    workspaceId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "workspace_id",
    },

    audienceId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "audience_id",
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    htmlContent: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "html_content",
    },

    status: {
      type: DataTypes.ENUM(
        "draft",
        "scheduled",
        "processing",
        "sent",
        "failed"
      ),
      defaultValue: "draft",
    },

    scheduledAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "scheduled_at",
    },

    sentAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "sent_at",
    },
  },
  {
    tableName: "campaigns",
    underscored: true,
    timestamps: true,
  }
);

module.exports = Campaign;