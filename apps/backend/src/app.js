const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const pinoHttp = require("pino-http");

const logger = require("./config/loggerConfig");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const audienceRoutes = require("./modules/audience/audienceRoutes");
const campaignRoutes = require("./modules/campaign/campaignRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Security
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); 
app.use(compression());

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// HTTP Logger
app.use(
  pinoHttp({
    logger,
  })
);

// Routes
app.use("/api/v1", routes);
app.use("/api/v1/audiences", audienceRoutes);
app.use("/api/v1/campaigns", campaignRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

// 404 Handler
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;