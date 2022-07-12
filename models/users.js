const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 1024,
    required: true,
  },
  DOBirth: String,
  households: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Household",
  },
  households_name: Array,
  location: {
    longitude: String,
    latitude: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  img: Buffer,
});

userSchema.methods.generateAuthToken = function () {
  return (token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      email: this.email,
      households: this.households,
      households_name: this.households_name,
    },
    "jwtPrivateKey"
  ));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    password: Joi.string().max(255),
    DOBirth: Joi.string(),
    households: Joi.array(),
    households_name: Joi.array(),
    longitude: Joi.string(),
    latitude: Joi.string(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
