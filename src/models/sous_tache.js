const mongoose = require("mongoose");

const sous_tache = mongoose.model(
  "sous_tache",
  new mongoose.Schema({
    label: String,
    etat : String, //["Pas mis en oeuvre","En cours","Terminé"]
    tache_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
      },
      phase_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "phase"
      },
      exigence_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exigence"
      },
      date_debut: String,
      date_fin: String,
      clause: String,
      collaborateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaborateurs"
      }
    
  })
);

module.exports = sous_tache;