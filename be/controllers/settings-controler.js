const { validationResult } = require("express-validator");

let settings = {
  maintenance: false,
  maxImagesToConvert: 3,
};

const getSettings = async (_req, res) => {
  res.json(settings);
};

const setMaintenance = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const maintenance = req.body.isUnderMaintenance;
  settings.maintenance = maintenance;
  res.json({ isUnderMaintenance: maintenance });
};

const setMaxImagesToConvert = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const maxImagesToConvert = req.body.maxImagesToConvert;
  settings.maxImagesToConvert = maxImagesToConvert;
  res.json({ maxImagesToConvert });
};

exports.getSettings = getSettings;
exports.setMaintenance = setMaintenance;
exports.setMaxImagesToConvert = setMaxImagesToConvert;
