const {
  registerSchema,
  loginSchema,
} = require("./authValidation");

const authService = require("./authService");

const register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await authService.register(data);

    return res.status(201).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await authService.login(data);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = {
  register,
  login,
  me,
};