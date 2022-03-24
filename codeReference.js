mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongoDB..."))
  .catch((err) => console.error("Could not connect to mongoDB...", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  DOBirth: { type: Date, default: Date.now },
});

// Class
const User = mongoose.model("user", userSchema);

async function createUser() {
  // Object
  const user = new User({
    name: "Phoenix Baker",
    email: "phoenixbvu@gmail.com",
    password: "yeahnah",
  });

  const result = await user.save();
  console.log(result);
}

// createUser()

async function getUsers() {
  // eq (equal)
  // ne (not equal)
  // gt ( greater than)
  // gte( gt or equal)
  // lt ( less than)
  // lte ( lt or equal)
  // in
  // nin (not in)

  const users = await User.find()
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, email: 1 });
  console.log(users);
}

getUsers();

const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
