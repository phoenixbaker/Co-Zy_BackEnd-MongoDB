const Joi = require("joi");
const mongoose = require("mongoose");

const householdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  notes: {
    note: [String],
    user_id: [mongoose.Schema.Types.ObjectId],
  },
  events: [String],
  expenses: [String],
  longitude: String,
  latitude: String,
});

const Household = mongoose.model("Household", householdSchema);

// AUTH TOKEN FOR HOUSEHOLD IF WANTED ENCRYPTION

householdSchema.methods.generateAuthToken = function () {
  return (token = jwt.sign(
    {
      _id: this.id,
      name: this.name,
      users: this.users,
      notes: this.notes,
      events: this.events,
      expenses: this.expenses,
      location: this.location,
    },
    "jwtPrivateKey"
  ));
};

function validateHousehold(Household) {
  const schema = Joi.object({
    name: Joi.string(),
    users: Joi.string(),
    notes: Joi.string(),
    events: Joi.string(),
    expenses: Joi.string(),
    longitude: Joi.string(),
    latitude: Joi.string(),
  });
  return schema.validate(Household);
}

exports.Household = Household;
exports.validate = validateHousehold;
