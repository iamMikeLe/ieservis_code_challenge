const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controler");

const { userLogin } = require("../utils/form-validation");

/**
 * POST REQUEST - to log user in
 * route: /login
 * @param email {String}
 * @param password {String}
 * @returns {Object} - user object
 */
router.post("/login", userLogin, usersController.login);

/**
 * POST REQUEST - to log admin user in
 * route: /admin/login
 * @param email {String}
 * @param password {String}
 * @returns {Object} - admin user object
 */
router.post("/admin/login", userLogin, usersController.adminLogin);

module.exports = router;
