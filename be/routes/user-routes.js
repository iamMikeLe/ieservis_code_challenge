const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controler");
const maintenanceControler = require("../controllers/maintenance-controler");
const settingsControler = require("../controllers/settings-controler");

const {
  userLogin,
  maintenance,
  maxImageValidation,
} = require("../utils/form-validation");

/**
 * GET REQUEST - to get maintenance status
 *  route: /maintenance
 * @returns {Object} - maintenance status
 */
router.get("/maintenance", maintenanceControler.getMaintenanceStatus);

/**
 * GET REQUEST - to get app settings
 *  route: /settings
 * @returns {Object} - app settings
 */
router.get("/settings", settingsControler.getSettings);

/**
 * POST REQUEST - to set maintenance status
 * route: /maintenance
 * @param isUnderMaintenance {Boolean}
 * @returns {Object} - maintenance app setting
 */
router.post("/maintenance", maintenance, settingsControler.setMaintenance);

/**
 * POST REQUEST - to set maintenance status
 * route: /max-images-to-convert
 * @param maxImagesToConvert {number}
 * @returns {Object} - max images app setting
 */
router.post(
  "/max-images-to-convert",
  maxImageValidation,
  settingsControler.setMaxImagesToConvert
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
