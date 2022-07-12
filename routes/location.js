const { User, validate } = require("../models/users");
const { Household } = require("../models/household");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// Change to get
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.body.id);
  res.send(user._id);
});

router.put("/", auth, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  });
  res.send(user._id);
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
