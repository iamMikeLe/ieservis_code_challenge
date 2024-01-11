const { check } = require("express-validator");

const userLogin = [
  check("password").not().isEmpty(),
  check("email").normalizeEmail().isEmail(),
];

module.exports = {
  userLogin,
};
