const express = require("express");
const auth = require("../middleware/auth");
const { Household } = require("../models/household");
const router = express.Router();

// GET NOTES FROM HOUSEHOLD

router.post("/", auth, async (req, res) => {
  const notes = await Household.findById(req.body.id).select("notes");
  console.log(notes);
  res.send(notes);
});

// UPDATE NOTES || ADD

router.put("/", auth, async (req, res) => {
  // Make Error Auth
  const note = await Household.findByIdAndUpdate(
    req.body.id,
    {
      $push: {
        notes: req.body.note,
      },
    },
    {
      new: true,
    }
  );
  console.log(note.notes);
  res.send(note.notes);
});

// DELETE NOTES

router.delete("/", auth, async (req, res) => {
  const note = await Household.findByIdAndUpdate(
    req.body.id,
    {
      $pull: {
        notes: req.body.notes,
      },
    },
    {
      new: true,
    }
  );
  console.log(note.notes);
  res.send(note.notes);
});

module.exports = router;
