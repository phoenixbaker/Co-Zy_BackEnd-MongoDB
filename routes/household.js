const { Household, validate } = require("../models/household");
const express = require("express");
const { User } = require("../models/users");
const auth = require("../middleware/auth");

const router = express.Router();

// GET ALL HOUSEHOLDS

router.get("/", auth, async (req, res) => {
  const household = await Household.find();
  res.send(household);
});

// GET SINGLE HUOSEHOLD BY ID

router.get("/:id", async (req, res) => {
  const household = await Household.findById(req.params.id);

  if (!household) return res.status(404).send("Weellll");

  res.send(household);
});

// REGISTER A HOUSEHOLD

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let household = await Household.findOne({ users: req.body.users });
  if (household)
    return res.status(400).send("You already have a current household");

  household = new Household(req.body);

  console.log(req.body.users);
  console.log(household);

  await User.findByIdAndUpdate(req.body.users, {
    $push: {
      households: household._id,
    },
  });

  household = await household.save();
  res.send(household);
});

// POST A USER IN HOUSEHOLD

router.post("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let household = await Household.findByIdAndUpdate(req.params.id, {
    $push: {
      users: req.params.users,
    },
  });
  if (!household) return res.status(404).send(error.details[0].message);

  res.send(household);
});

router.delete("/:id", auth, async (req, res) => {
  const household = await Household.findByIdAndRemove(req.params.id);

  if (!household) return res.status(404).send("No Househould with ID found");

  res.send(household);
});

module.exports = router;
