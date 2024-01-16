const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user-routes");
const settingsRoutes = require("./routes/settings-route");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  next();
});

app.use(userRoutes);
app.use(settingsRoutes);

app.listen(5000);
