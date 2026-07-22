const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Workspace, User } = require("../../database/models");
const AppError = require("../../utils/appError");

const register = async (data) => {
  const {
    workspaceName,
    firstName,
    lastName,
    email,
    password,
  } = data;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const workspace = await Workspace.create({
    name: workspaceName,
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    workspaceId: workspace.id,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      userId: user.id,
      workspaceId: workspace.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      workspaceId: user.workspaceId,
    },
    workspace,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
      workspaceId: user.workspaceId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      workspaceId: user.workspaceId,
    },
  };
};

module.exports = {
  register,
  login,
};