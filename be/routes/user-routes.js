const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users-controler");

const { userLogin } = require("../utils/form-validation");

router.get("/", (_req, res) => {
  console.log("GET Request in /user");
  res.json({ message: "dummy response" });
});

/**
 * POST REQUEST - to log user in
 * route: /login
 * @param email {String}
 * @param password {String}
 */
router.post("/login", userLogin, usersController.login);

module.exports = router;
