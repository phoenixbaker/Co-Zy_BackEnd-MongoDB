const bcrypt = require("bcrypt");
const mongo = require("mongodb");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Grid = require("gridfs-stream");
const zlib = require("zlib");
const fs = require("fs");

const { User, validate } = require("../models/users");
const auth = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const conn = require("../database");
const mongoose = require("mongoose");

router.post("/upload", auth, upload.single("img"), async (req, res) => {
  // Save img name in User
  const file = mongoose.Types.ObjectId("624c1d06b65dd76e6f5d0691");
  const img = await conn.db.collection("fs.chunks").findOne({ _id: file });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      img: img._id,
    },
    {
      new: true,
    }
  );

  res.send(user);
});

router.get("/download/:id", auth, async (req, res) => {
  console.log("Download Profile Picture Request");
  const id = mongoose.Types.ObjectId(req.params.id);
  const img = await conn.db.collection("fs.chunks").findOne({ _id: id });
  console.log(img.data);
  res.send(img.data);
});

// router.get("/download/:id", auth, (req, res) => {
//   const gfs = new mongoose.mongo.GridFSBucket(conn.db);
//   // Validation needed
//   res.header("Content-Type", "arraybuffer");
//   res.setHeader("Content-Type", "arraybuffer");
//   gfs
//     .openDownloadStreamByName(req.params.id)
//     .pipe(res)
//     .on("error", () => {
//       console.log("Error:" + error);
//     })
//     .on("finish", () => {
//       console.log("Done Downloading");
//     });
// });

// ADD HUOSEHOLD AUTH

// GET SINGLE USER

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// GET ALL USERS

router.get("/", async (req, res) => {
  const users = await User.find();
  console.log("here");
  res.send(users);
});

// REGISTER A USER

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  console.log(user);

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(token);
});

// CHANGE USER DETAILS

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) return res.status(404).send("The user with ID not found."); // If there is no user with the ID return 404 error code

  res.send(user); // send user back to client
});

// DELETE A USER

router.delete("/:id", auth, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send("The course with ID not found."); // If there is no user with the ID return 404 error code;

  res.send(user);
});

module.exports = router;
