const HttpError = require("../models/http-error");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === "user@email.com" && password === "userPassword") {
    return res.json({
      userId: "123456",
      email,
      type: "user",
    });
  }
  return next(new HttpError("Invalid credentials", 401));
};

exports.login = login;
