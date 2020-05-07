const mongoose = require("mongoose");

const db = require("./models");
console.log("here");
const createPhase = function(phase) {
    return db.phase.create(phase).then(docPhase => {
      console.log("\n>> Created phase :\n", docPhase);
      return docPhase;
    });
  };
  
  const createExigence = function(exigence) {
    return db.exigence.create(exigence).then(docExigence => {
      console.log("\n>> Created Exigence :\n", docExigence);
      return docExigence;
    });
  };

  const addExigenceToPhase = function(exigenceId, phaseId) {
    return db.exigence.findByIdAndUpdate(
        exigenceId,
      { phase: phaseId },
      { new: true, useFindAndModify: false }
    );
  };
  
  const getExigenceWithPopulate = function(id) {
    return db.exigence.findById(id)
      .populate("phase", "name -_id")
  };
  // supplémentaire !! 
  
  const getExigencesInPhase = function(phaseId) {
    return db.phase.find({ phase: phaseId })
      .populate("phase", "name -_id")

  };



  const run = async function() {

    //les 4 phases 
   var  phase1= await createPhase({
      nom: "Plan",
      enabled: false,
      etat : ["Pas mis en oeuvre","En cours","Terminé"]
    });
    var  phase2= await createPhase({
        nom: "Do",
        enabled: false,
        etat : ["Pas mis en oeuvre","En cours","Terminé"]
      });
      var  phase3= await createPhase({
        nom: "Check",
        enabled: false,
        etat : ["Pas mis en oeuvre","En cours","Terminé"]
      });
      var  phase4= await createPhase({
        nom: "Act",
        enabled: false,
        etat : ["Pas mis en oeuvre","En cours","Terminé"]
      });

/**
 * INSERT Exigences
 */
// Insertion 1 
      var exigence4 = await createExigence({
        nom: "Contexte de l'organisation",
        clause: "clause_4",
    complete: false,
 
      });
      exigence4 = await addExigenceToPhase(exigence4._id, phase1._id);
      console.log("\n>> exigence  4 :\n", phase1);
    
      exigence4 = await getExigenceWithPopulate(exigence4._id);
      console.log("\n>>  Populated Exigence  :\n", exigence4);
 // Insertion 2
 var exigence6 = await createExigence({
    nom: "Planification",
    clause: "clause_6",
complete: false,

  });
  exigence6 = await addExigenceToPhase(exigence6._id, phase1._id);
  console.log("\n>> exigence  6 :\n", phase1);

  exigence6 = await getExigenceWithPopulate(exigence6._id);
  console.log("\n>>  Populated Exigence  :\n", exigence6);
 // Insertion 3
 var exigence7 = await createExigence({
    nom: "Support",
    clause: "clause_7",
complete: false,

  });
  exigence7 = await addExigenceToPhase(exigence7._id, phase2._id);
  console.log("\n>> exigence  7 :\n", phase2);

  exigence7 = await getExigenceWithPopulate(exigence7._id);
  console.log("\n>>  Populated Exigence  :\n", exigence7);

   // Insertion 4
 var exigence9 = await createExigence({
    nom: "Evaluation des Performances",
    clause: "clause_9",
complete: false,

  });
  exigence9 = await addExigenceToPhase(exigence9._id, phase3._id);
  console.log("\n>> exigence  9 :\n", phase3);

  exigence9 = await getExigenceWithPopulate(exigence9._id);
  console.log("\n>>  Populated Exigence  :\n", exigence9);
   // Insertion 5
 var exigence10 = await createExigence({
    nom: "Amélioration",
    clause: "clause_10",
complete: false,

  });
  exigence10 = await addExigenceToPhase(exigence10._id, phase4._id);
  console.log("\n>> exigence  10 :\n", phase4);

  exigence10 = await getExigenceWithPopulate(exigence10._id);
  console.log("\n>>  Populated Exigence 10 :\n", exigence10);


 };

  mongoose
  .connect("mongodb://localhost/SSI_Metrics", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

run();
