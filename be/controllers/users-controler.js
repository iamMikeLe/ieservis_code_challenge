const { validationResult } = require("express-validator");
const getUserByEmail = require("../utils/helper");

const authenticateUser = async (req, res, userType) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.send({ errors: result.array() });

  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (user && user.password === password && user.type === userType) {
    return res.json({
      email,
      type: user.type,
    });
  }

  const errorResponse = {
    status: "error",
    statusCode: 401,
    message: "Invalid credentials",
  };

  return res.status(401).json(errorResponse);
};

const login = async (req, res) => {
  return authenticateUser(req, res, "user");
};

const adminLogin = async (req, res) => {
  return authenticateUser(req, res, "admin");
};

exports.login = login;
exports.adminLogin = adminLogin;
