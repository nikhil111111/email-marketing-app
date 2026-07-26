/**
 * Audience Filter Engine
 *
 * Purpose:
 * Converts audience filter rules into Sequelize WHERE conditions.
 *
 * Responsibilities:
 * - Parse audience rules
 * - Generate dynamic Sequelize queries
 * - Support multiple operators and conditions
 *
 * Called By:
 * campaignProcessor.js
 *
 * Output:
 * Sequelize WHERE clause
 *
 * Flow:
 * Audience Filters → Sequelize Query → Contact Search
 */
const { Op, Sequelize } = require("sequelize");

const buildRule = (rule) => {
    const { field, operator, value } = rule;

    // Standard Contact fields
    if (["name", "email", "phone"].includes(field)) {
        switch (operator) {
            case "equals":
                return { [field]: value };

            case "notEquals":
                return {
                    [field]: {
                        [Op.ne]: value,
                    },
                };

            case "contains":
                return {
                    [field]: {
                        [Op.iLike]: `%${value}%`,
                    },
                };

            case "startsWith":
                return {
                    [field]: {
                        [Op.iLike]: `${value}%`,
                    },
                };

            case "endsWith":
                return {
                    [field]: {
                        [Op.iLike]: `%${value}`,
                    },
                };

            default:
                throw new Error(`Unsupported operator: ${operator}`);
        }
    }

    // Dynamic custom fields stored in JSONB
    const jsonPath = Sequelize.json(`custom_fields.${field}`);

    switch (operator) {
        case "equals":
            return Sequelize.where(jsonPath, value);

        case "notEquals":
            return Sequelize.where(jsonPath, {
                [Op.ne]: value,
            });

        case "contains":
            return Sequelize.where(jsonPath, {
                [Op.iLike]: `%${value}%`,
            });

        case "startsWith":
            return Sequelize.where(jsonPath, {
                [Op.iLike]: `${value}%`,
            });

        case "endsWith":
            return Sequelize.where(jsonPath, {
                [Op.iLike]: `%${value}`,
            });
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
};
const buildWhereClause = (workspaceId, filters = {}) => {
    const {
        condition = "AND",
        rules = [],
    } = filters;

    return {
        workspaceId,
        [condition === "OR" ? Op.or : Op.and]: rules.map(buildRule),
    };
};
module.exports = {
    buildWhereClause,
};