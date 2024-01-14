const { check } = require("express-validator");

const userLogin = [
  check("password").not().isEmpty().withMessage("password cannot be empty"),
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Incorrect email format"),
];

const maintenance = [
  check("isUnderMaintenance")
    .isIn(["true", "false"])
    .withMessage('isUnderMaintenance must be either "true" or "false"'),
];

module.exports = {
  userLogin,
  maintenance,
};
