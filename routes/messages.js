const { Message, validate } = require("../models/messages");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await Message.find().sort("date");
  res.send(messages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let message = new Message(req.body);
  message = await message.save();

  res.send(message);
});

router.get("/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);
  console.log(message);
  if (!message) return res.status(404).send("Message not found");
  res.send(message);
});

module.exports = router;
