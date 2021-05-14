const mongoose = require("mongoose");

const note = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  noteBy: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Note", note);
