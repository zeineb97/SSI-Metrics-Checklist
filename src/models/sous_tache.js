const mongoose = require("mongoose");

const sous_tache = mongoose.model(
  "sous_tache",
  new mongoose.Schema({
    label: String,
    etat : ["Pas mis en oeuvre","En cours","Terminé"],
    tache_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tache"
      },
      date_debut: Date,
      date_fin:Date,
      clause: String,
      collaborateur_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaborateurs"
      }
    
  })
);

module.exports = sous_tache;