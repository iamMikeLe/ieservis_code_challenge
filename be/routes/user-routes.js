const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Request in /user");
  res.json({ message: "dummy response" });
});

module.exports = router;
