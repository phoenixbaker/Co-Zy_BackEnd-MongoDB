const { User, validate } = require("../models/users");
const { Household } = require("../models/household");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const location = await User.findById(req.body.id);
  res.send(location);
});

router.put("/", auth, async (req, res) => {
  const location = await User.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.send(location);
});

router.put("/household", auth, async (req, res) => {
  const location = await Household.findByIdAndUpdate(req.body.household_id, {
    longitude: req.body.lng,
    latitude: req.body.lat,
  });
  console.log(location);
  res.send(location);
});

module.exports = router;
