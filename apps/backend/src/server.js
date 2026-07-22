const app = require("./app");
const config = require("./config/appConfig");
const logger = require("./config/loggerConfig");
const { connectDatabase } = require("./config/databaseConfig");
const { syncDatabase } = require("./database/models");

const startServer = async () => {
  try {
    // Connect PostgreSQL
    await connectDatabase();

    // Sync Models
    await syncDatabase();

    // Start Server
    const server = app.listen(config.PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${config.PORT}`);
      logger.info(`Environment: ${config.NODE_ENV}`);
    });

    // Graceful Shutdown
    const shutdown = () => {
      logger.info("Shutting down server...");

      server.close(() => {
        logger.info("Server stopped successfully.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();