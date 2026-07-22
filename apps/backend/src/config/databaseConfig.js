const { Sequelize } = require("sequelize");
const config = require("./appConfig");
const logger = require("./loggerConfig");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",

    logging: false,

    define: {
      timestamps: true,
      underscored: true,
    },
  }
);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("✅ PostgreSQL connected successfully");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDatabase,
};