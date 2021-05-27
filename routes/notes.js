const express = require("express");
const router = express.Router();
const Note = require("../models/note");
const user = require("../models/user");

router.get("/:userId", async (req, res) => {
  // Get current user's notes
  const userNotes = await Note.find({ noteBy: req.params.userId });
  if (userNotes.length > 0) {
    res.status(200).json(userNotes);
  } else {
    console.log("no notes");
    res.status(204).send();
  }
});

// Post note
router.post("/", (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body,
    noteBy: req.body.noteBy,
  });

  note
    .save()
    .then((resp) => {
      console.log("Note", resp);
      res.status(200).json(resp);
    })
    .catch((err) => {
      console.log("Err", err);
      res.status(400).json({ error: err });
    });

  console.log(note);
});

// Edit note
router.put("/:id", async (req, res) => {
  const note = {
    title: req.body.title,
    body: req.body.body,
    noteBy: req.body.noteBy,
  };
  Note.findOneAndUpdate({ _id: req.params.id }, note, (err, result) => {
    if (err) {
      res.status(400).json({ Error: err });
    } else {
      res.status(200).json({ result });
    }
  });
});

router.delete("/:id", (req, res) => {
  Note.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(400).json({ Error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
