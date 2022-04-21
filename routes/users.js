const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User, validate } = require("../models/users");
const auth = require("../middleware/auth");

// ADD HUOSEHOLD AUTH

// GET SINGLE USER

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-img", "-password");
  res.send(user);
});

// GET ALL USERS

router.get("/", async (req, res) => {
  const users = await User.find().select(["-img", "-password"]);
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
