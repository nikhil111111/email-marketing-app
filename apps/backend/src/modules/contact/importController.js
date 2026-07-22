const importService = require("./importService");
const { validateCsvFile } = require("./importValidation");

const importContacts = async (req, res, next) => {
  try {
    validateCsvFile(req.file);

    const result = await importService.importContacts(
      req.user.workspaceId,
      req.file.buffer
    );

    return res.status(200).json({
      success: true,
      message: "Contacts imported successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  importContacts,
};