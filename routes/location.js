const { User, validate } = require("../models/users");
const mongoose = require("mongoose");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/:id", auth, async (req, res) => {
  const location = await User.findById(req.params.id);
  res.send(location);
});

router.put("/:id", auth, async (req, res) => {
  const location = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(location);
});

module.exports = router;
