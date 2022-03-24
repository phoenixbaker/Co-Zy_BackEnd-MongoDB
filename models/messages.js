const mongoose = require("mongoose");
const Joi = require("joi");

const Message = mongoose.model(
  "Message",
  new mongoose.Schema({
    title: String,
    description: String,
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

function validateMessage(message) {
  const schema = Joi.object({
    title: Joi.string(),
    description: Joi.string().min(1),
  });
  return schema.validate(message);
}

exports.Message = Message;
exports.validate = validateMessage;
