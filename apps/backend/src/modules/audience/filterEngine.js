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

const buildWhereClause = (filters) => {
    const condition =
        filters.condition === "OR" ? Op.or : Op.and;

    return {
        [condition]: filters.rules.map(buildRule),
    };
};

module.exports = {
    buildWhereClause,
};