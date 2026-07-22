const AppError = require("../../utils/appError");

const validateCsvFile = (file) => {
  if (!file) {
    throw new AppError("CSV file is required", 400);
  }

  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.ms-excel",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new AppError("Only CSV files are allowed", 400);
  }
};

module.exports = {
  validateCsvFile,
};