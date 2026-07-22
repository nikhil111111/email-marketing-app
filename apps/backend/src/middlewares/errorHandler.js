const { ZodError } = require("zod");
const { ValidationError, UniqueConstraintError } = require("sequelize");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      })),
    });
  }

  // Sequelize Validation Error
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Duplicate Key Error
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      message: err.errors[0].message,
    });
  }

  // Custom Errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Default Error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;