const mongoose = require("mongoose");

const db = require("./models");

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

  const createTache = function(tache) {
    return db.tache.create(tache).then(docTache => {
      console.log("\n>> Created Tache :\n", docTache);
      return docTache;
    });
  };


  const createSousTache = function(sous_tache) {
    return db.sous_tache.create(sous_tache).then(docSousTache => {
      console.log("\n>> Created Sous Tache :\n", docSousTache);
      return docSousTache;
    });
  };

// one phase has many exigences
  const addExigenceToPhase = function(exigenceId, phaseId) {
    return db.exigence.findByIdAndUpdate(
        exigenceId,
      { phase_id: phaseId },
      { new: true, useFindAndModify: false }
    );
  };
  
  const getExigenceWithPopulate = function(id) {
    return db.exigence.findById(id)
      .populate("phase", "name -_id")
  };

  // one exigence has many taches
  

  const addTacheToExigence = function(tacheId, exigenceId) {
    return db.tache.findByIdAndUpdate(
        tacheId,
      { exigence_id: exigenceId },
      { new: true, useFindAndModify: false }
    );
  };
  
  const getTacheWithPopulate = function(id) {
    return db.tache.findById(id)
      .populate("tache", "name -_id")
  };

  // one tache has many sous_tache
  const addSousTacheToTache = function(sousTacheId, tacheId) {
    return db.sous_tache.findByIdAndUpdate(
        sousTacheId,
      { tache_id: tacheId },
      { new: true, useFindAndModify: false }
    );
  };
  
  const getSousTacheWithPopulate = function(id) {
    return db.sous_tache.findById(id)
      .populate("sous_tache", "name -_id")
  };

  
  // supplémentaire !! 
  
  const getExigencesInPhase = function(phaseId) {
    return db.phase.find({ phase: phaseId })
      .populate("phase", "name -_id")

  };
  const getTachesInExogence = function(phaseId) {
    return db.phase.find({ phase: phaseId })
      .populate("exigence", "name -_id")

  };

  const getSousTachesInTache = function(tacheId) {
    return db.phase.find({ tache: tacheId })
      .populate("tache", "name -_id")

  };

  



  const run = async function() {

    //les 4 phases 
   var  phase1= await createPhase({
      nom: "Plan",
      enabled: false,
      etat : "Pas mis en oeuvre"
    });
    var  phase2= await createPhase({
        nom: "Do",
        enabled: false,
        etat : "Pas mis en oeuvre"
      });
      var  phase3= await createPhase({
        nom: "Check",
        enabled: false,
        etat : "Pas mis en oeuvre"
      });
      var  phase4= await createPhase({
        nom: "Act",
        enabled: false,
        etat : "Pas mis en oeuvre"
      });

/**
 * INSERT Exigences
 */
// Insertion 1 
 var exigence4 = await createExigence({
        nom: "Contexte de l'organisation",
        clause: "clause 4",
        complete: false,
 
      });
    exigence4 = await addExigenceToPhase(exigence4._id, phase1._id);
    exigence4 = await getExigenceWithPopulate(exigence4._id);
      
 // Insertion 2
 var exigence6 = await createExigence({
    nom: "Planification",
    clause: "clause 6",
    complete: false,

  });
  exigence6 = await addExigenceToPhase(exigence6._id, phase1._id);
  exigence6 = await getExigenceWithPopulate(exigence6._id);
 
 // Insertion 3
 var exigence7 = await createExigence({
    nom: "Support",
    clause: "clause 7",
    complete: false,

  });
  exigence7 = await addExigenceToPhase(exigence7._id, phase2._id);
  exigence7 = await getExigenceWithPopulate(exigence7._id);

   // Insertion 4
 var exigence9 = await createExigence({
    nom: "Evaluation des Performances",
    clause: "clause 9",
    complete: false,

  });
  exigence9 = await addExigenceToPhase(exigence9._id, phase3._id);
  exigence9 = await getExigenceWithPopulate(exigence9._id);

   // Insertion 5
 var exigence10 = await createExigence({
    nom: "Amélioration",
    clause: "clause 10",
    complete: false,

  });
  exigence10 = await addExigenceToPhase(exigence10._id, phase4._id);
  exigence10 = await getExigenceWithPopulate(exigence10._id);


  /**
 * INSERT Taches
 */
// Insertion 1 

var tache1= await createTache({
  label : "Comprendre l'organisation et son contexte",
  etat: "pas mis en oeuvre",
  clause: "clause 4.1"
});

tache1 =  await addTacheToExigence(tache1._id, exigence4._id);
tache1 = await getTacheWithPopulate(tache1._id);

// Insertion 2

var tache2= await createTache({
  label : "Comprendre les besoins et les attentes des parties prenantes",
  etat: "pas mis en oeuvre",
  clause: "clause 4.2"
});

tache2 =  await addTacheToExigence(tache2._id, exigence4._id);
tache2 = await getTacheWithPopulate(tache2._id);

// Insertion 3

var tache3= await createTache({
  label : "Déterminer la portée du SMSI",
  etat: "pas mis en oeuvre",
  clause: "clause 4.3"
});

tache3 =  await addTacheToExigence(tache3._id, exigence4._id);
tache3 = await getTacheWithPopulate(tache3._id);

// Insertion 4

var tache4= await createTache({
  label : "Actions pour faire face aux risques et opportunités : la planification du  SMSI",
  etat: "pas mis en oeuvre",
  clause: "clause 6.1.1"
});

tache4 =  await addTacheToExigence(tache4._id, exigence6._id);
tache4 = await getTacheWithPopulate(tache4._id);

// Insertion 5

var tache5= await createTache({
  label : "Examen de l'exactitude des risques selon l'évalution du RSSI",
  etat: "pas mis en oeuvre",
  clause: "clause 6.1.2"
});

tache5 =  await addTacheToExigence(tache5._id, exigence6._id);
tache5 = await getTacheWithPopulate(tache5._id);

// Insertion 6

var tache6= await createTache({
  label : "Traitement des risques de sécurité de l'information :définir un processus de traitement des risques liés à la sécurité des informations",
  etat: "pas mis en oeuvre",
  clause: "clause 6.1.3"
});

tache6 =  await addTacheToExigence(tache6._id, exigence6._id);
tache6 = await getTacheWithPopulate(tache6._id);

// Insertion 7

var tache7= await createTache({
  label : "Communication :L'organisation doit déterminer la nécessité de communications internes et externes pertinentes pour le SMSI",
  etat: "pas mis en oeuvre",
  clause: "clause 7.4"
});

tache7 =  await addTacheToExigence(tache7._id, exigence7._id);
tache7 = await getTacheWithPopulate(tache7._id);

// Insertion 8

var tache8= await createTache({
  label : "Suivi, mesure, analyse et évaluation : L'organisation évalue les performances en matière de sécurité de l'information et l'efficacité du smsi.",
  etat: "pas mis en oeuvre",
  clause: "clause 9.1"
});

tache8 =  await addTacheToExigence(tache8._id, exigence9._id);
tache8 = await getTacheWithPopulate(tache8._id);

// Insertion 9

var tache9= await createTache({
  label : "Audit interne",
  etat: "pas mis en oeuvre",
  clause: "clause 9.2"
});

tache9 =  await addTacheToExigence(tache9._id, exigence9._id);
tache9 = await getTacheWithPopulate(tache9._id);

// Insert9ion 10

var tache10= await createTache({
  label : "Management review",
  etat: "pas mis en oeuvre",
  clause: "clause 9.3"
});

tache10 =  await addTacheToExigence(tache10._id, exigence9._id);
tache10 = await getTacheWithPopulate(tache10._id);

// Insertion 11

var tache11= await createTache({
  label : "Non-conformité et action corrective",
  etat: "pas mis en oeuvre",
  clause: "clause 10.1"
});

tache11 =  await addTacheToExigence(tache11._id, exigence10._id);
tache11 = await getTacheWithPopulate(tache11._id);



/**
 * Insertion des sous taches 
 */
// insertion 1 
var sstache1= await createSousTache({
  clause : "clause.10.2.1",
  date_debut : "2022-01-27T23:00:00.000Z",
   date_fin : "2022-03-27T23:00:00.000Z",
   etat : "pas mis en oeuvre",
   label : "Examiner la non-conformité"
});

sstache1 =  await addSousTacheToTache(sstache1._id, tache1._id);
sstache1 = await getSousTacheWithPopulate(sstache1._id);











console.log("Kamelna !!! ");
};


  mongoose
  .connect("mongodb://localhost/SSI_Metrics", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

run();
