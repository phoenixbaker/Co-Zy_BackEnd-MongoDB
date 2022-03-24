const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

// LOGIN AUTH

router.post("/", async (req, res) => {
  console.log("User requst sent");
  console.log(req.body);

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // Yeah change later lmao || segment const token thingy to user model

  const token = user.generateAuthToken();
  console.log(token);
  res.header("x-auth-token", token).send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
