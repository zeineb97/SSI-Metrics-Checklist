const mongoose = require("mongoose");

const phase = mongoose.model(
  "phase",
  new mongoose.Schema({
    nom: String,
    enabled: Boolean,
    etat : ["Pas mis en oeuvre","En cours","Terminé"]
  })
);

module.exports = phase;