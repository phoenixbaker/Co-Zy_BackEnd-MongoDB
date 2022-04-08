const express = require("express");
const router = express.Router();

const { User } = require("../models/users");
const { Household } = require("../models/household");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const conn = require("../database");
const mongoose = require("mongoose");

router.post("/upload", auth, upload.single("img"), async (req, res) => {
  // Save img name in User
  console.log(req.file);
  if (!req.file || Object.keys(req.file).length === 0) {
    return res.status(400).send("No files where uploaded");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      img: req.file.buffer,
    },
    {
      new: true,
    }
  );

  await Household.findById(req.user.households[0]).populate(
    "users",
    ["img", "name"]
    // "USER_LOCATION"
  );

  res.send("Hey, It Worked");
});

router.get("/download", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  //   console.log(user.img);
  res.send(JSON.stringify(user.img));
});

module.exports = router;
