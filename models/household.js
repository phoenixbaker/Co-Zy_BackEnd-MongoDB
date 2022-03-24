const Joi = require("joi");
const mongoose = require("mongoose");

const Household = mongoose.model(
    "Household",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        users: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            required: true,
        },
    })
)

function validateHousehold(Household) {
    const schema = Joi.object({
        name: Joi.string(),
        users: Joi.string(),
        });
        return schema.validate(Household);
}

exports.Household = Household;
exports.validate = validateHousehold;
