const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/databaseConfig");
const Workspace = require("./workspaceModel");

const Audience = sequelize.define(
    "Audience",
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

        filters: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {
                condition: "AND",
                rules: [],
            },
        }
    },
    {
        tableName: "audiences",
        indexes: [
            {
                unique: true,
                fields: ["workspace_id", "name"],
            },
        ],
    }
);

Workspace.hasMany(Audience, {
    foreignKey: "workspaceId",
    as: "audiences",
});

Audience.belongsTo(Workspace, {
    foreignKey: "workspaceId",
    as: "workspace",
});

module.exports = Audience;