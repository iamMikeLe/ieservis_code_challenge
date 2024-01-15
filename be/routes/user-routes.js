const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controler");
const maintenanceControler = require("../controllers/maintenance-controler");

const { userLogin, maintenance } = require("../utils/form-validation");

/**
 * GET REQUEST - to get maintenance status
 *  route: /maintenance
 * @returns {Object} - maintenance status
 */
router.get("/maintenance", maintenanceControler.getMaintenanceStatus);

/**
 * POST REQUEST - to set maintenance status
 * route: /maintenance
 * @param isUnderMaintenance {Boolean}
 * @returns {Object} - maintenance status
 */
router.post(
  "/maintenance",
  maintenance,
  maintenanceControler.setMaintenanceStatus
);

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
 * route: /login
 * @param email {String}
 * @param password {String}
 * @returns {Object} - admin user object
 */
router.post("/admin/login", userLogin, usersController.adminLogin);

module.exports = router;
