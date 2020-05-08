const mongoose = require("mongoose");

const tache = mongoose.model(
  "tache",
  new mongoose.Schema({
    label: String,
    etat : String, // ["Pas mis en oeuvre","En cours","Terminé"]
    clause: String,
    exigence_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exigence"
      }
    
  })
);

module.exports = tache;