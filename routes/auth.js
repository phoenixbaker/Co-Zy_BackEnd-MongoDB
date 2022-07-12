const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const { Household } = require("../models/household");
const router = express.Router();

// LOGIN AUTH

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }).select(["-img"]);
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  console.log(token);
  res.header("x-auth-token", token).send(user);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().max(255).required(),
  });
  return schema.validate(req);
}

module.exports = router;
