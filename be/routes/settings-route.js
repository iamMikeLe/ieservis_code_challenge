const express = require("express");
const router = express.Router();
const settingsControler = require("../controllers/settings-controler");

const { maintenance, maxImageValidation } = require("../utils/form-validation");

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
 * POST REQUEST - to set max images setting
 * route: /max-images-to-convert
 * @param maxImagesToConvert {number}
 * @returns {Object} - max images app setting
 */
router.post(
  "/max-images-to-convert",
  maxImageValidation,
  settingsControler.setMaxImagesToConvert
);

module.exports = router;
