const { validationResult } = require("express-validator");
const fs = require("fs").promises;

const getMaintenanceStatus = async (_req, res) => {
  let maintenance = await fs.readFile("maintenance.txt", "utf8");
  maintenance = maintenance.trim() === "true";
  res.json(maintenance);
};

const setMaintenanceStatus = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const maintenance = req.body.isUnderMaintenance;
  await fs.writeFile("maintenance.txt", maintenance.toString());
  res.json({ isUnderMaintenance: maintenance });
};

exports.getMaintenanceStatus = getMaintenanceStatus;
exports.setMaintenanceStatus = setMaintenanceStatus;
