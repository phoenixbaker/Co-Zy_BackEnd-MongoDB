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
  console.log(req.body);
  // Make Error Auth
  const note = await Household.findByIdAndUpdate(
    req.body.id,
    {
      $push: {
        "notes.note": req.body.note,
        "notes.user_img_id": req.body.img_id,
      },
    },
    {
      new: true,
    }
  );
  console.log(note.notes);
  res.send(note);
});

// DELETE NOTES

router.delete("/", auth, async (req, res) => {
  const note = await Household.findByIdAndUpdate(
    req.body.id,
    {
      $pull: {
        notes: {
          note: req.body.note,
          user_id: req.body._id,
        },
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
