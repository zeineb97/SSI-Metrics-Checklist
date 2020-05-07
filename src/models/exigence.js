const mongoose = require("mongoose");

const exigence = mongoose.model(
  "exigence",
  new mongoose.Schema({
    nom: String,
    clause: String,
    complete: Boolean,
    phase : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "phase"
    }
  })
);

module.exports = exigence;
