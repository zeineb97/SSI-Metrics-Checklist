const mongoose = require("mongoose");

const db = require("./models");

const createPhase = function (phase) {
	return db.phase.create(phase).then(docPhase => {
		console.log("\n>> Created phase :\n", docPhase);
		return docPhase;
	});
};

const createExigence = function (exigence) {
	return db.exigence.create(exigence).then(docExigence => {
		console.log("\n>> Created Exigence :\n", docExigence);
		return docExigence;
	});
};

const createTache = function (tache) {
	return db.tache.create(tache).then(docTache => {
		console.log("\n>> Created Tache :\n", docTache);
		return docTache;
	});
};


const createSousTache = function (sous_tache) {
	return db.sous_tache.create(sous_tache).then(docSousTache => {
		console.log("\n>> Created Sous Tache :\n", docSousTache);
		return docSousTache;
	});
};

// one phase has many exigences
const addExigenceToPhase = function (exigenceId, phaseId) {
	return db.exigence.findByIdAndUpdate(
		exigenceId, {
			phase_id: phaseId
		}, {
			new: true,
			useFindAndModify: false
		}
	);
};

const getExigenceWithPopulate = function (id) {
	return db.exigence.findById(id)
		.populate("phase", "name -_id")
};

// one exigence has many taches


const addTacheToExigence = function (tacheId, exigenceId) {
	return db.tache.findByIdAndUpdate(
		tacheId, {
			exigence_id: exigenceId
		}, {
			new: true,
			useFindAndModify: false
		}
	);
};

const getTacheWithPopulate = function (id) {
	return db.tache.findById(id)
		.populate("tache", "name -_id")
};

// one tache has many sous_tache
const addSousTacheToTache = function (sousTacheId, tacheId) {
	return db.sous_tache.findByIdAndUpdate(
		sousTacheId, {
			tache_id: tacheId
		}, {
			new: true,
			useFindAndModify: false
		}
	);
};

const addSousTacheToPhase = function (sousTacheId, phaseId) {
	return db.sous_tache.findByIdAndUpdate(
		sousTacheId, {
			phase_id: phaseId
		}, {
			new: true,
			useFindAndModify: false
		}
	);
};


const addSousTacheToExigence = function (sousTacheId, exigenceId) {
	return db.sous_tache.findByIdAndUpdate(
		sousTacheId, {
			exigence_id: exigenceId
		}, {
			new: true,
			useFindAndModify: false
		}
	);
};


const getSousTacheWithPopulate = function (id) {
	return db.sous_tache.findById(id)
		.populate("sous_tache", "name -_id")
};


const run = async function () {

	//les 4 phases 
	var phase1 = await createPhase({
		nom: "Plan",
		enabled: true,
		etat: "Pas mis en oeuvre"
	});
	var phase2 = await createPhase({
		nom: "Do",
		enabled: false,
		etat: "Pas mis en oeuvre"
	});
	var phase3 = await createPhase({
		nom: "Check",
		enabled: false,
		etat: "Pas mis en oeuvre"
	});
	var phase4 = await createPhase({
		nom: "Act",
		enabled: false,
		etat: "Pas mis en oeuvre"
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

	var tache1 = await createTache({
		label: "Comprendre l'organisation et son contexte",
		etat: "pas mis en oeuvre",
		clause: "clause 4.1"
	});

	tache1 = await addTacheToExigence(tache1._id, exigence4._id);
	tache1 = await getTacheWithPopulate(tache1._id);

	// Insertion 2

	var tache2 = await createTache({
		label: "Comprendre les besoins et les attentes des parties prenantes",
		etat: "pas mis en oeuvre",
		clause: "clause 4.2"
	});

	tache2 = await addTacheToExigence(tache2._id, exigence4._id);
	tache2 = await getTacheWithPopulate(tache2._id);

	// Insertion 3

	var tache3 = await createTache({
		label: "Déterminer la portée du SMSI",
		etat: "pas mis en oeuvre",
		clause: "clause 4.3"
	});

	tache3 = await addTacheToExigence(tache3._id, exigence4._id);
	tache3 = await getTacheWithPopulate(tache3._id);

	// Insertion 4

	var tache4 = await createTache({
		label: "Actions pour faire face aux risques et opportunités : la planification du  SMSI",
		etat: "pas mis en oeuvre",
		clause: "clause 6.1.1"
	});

	tache4 = await addTacheToExigence(tache4._id, exigence6._id);
	tache4 = await getTacheWithPopulate(tache4._id);

	// Insertion 5

	var tache5 = await createTache({
		label: "Examen de l'exactitude des risques selon l'évalution du RSSI",
		etat: "pas mis en oeuvre",
		clause: "clause 6.1.2"
	});

	tache5 = await addTacheToExigence(tache5._id, exigence6._id);
	tache5 = await getTacheWithPopulate(tache5._id);

	// Insertion 6

	var tache6 = await createTache({
		label: "Traitement des risques de sécurité de l'information :définir un processus de traitement des risques liés à la sécurité des informations",
		etat: "pas mis en oeuvre",
		clause: "clause 6.1.3"
	});

	tache6 = await addTacheToExigence(tache6._id, exigence6._id);
	tache6 = await getTacheWithPopulate(tache6._id);

	// Insertion 7

	var tache7 = await createTache({
		label: "Communication :L'organisation doit déterminer la nécessité de communications internes et externes pertinentes pour le SMSI",
		etat: "pas mis en oeuvre",
		clause: "clause 7.4"
	});

	tache7 = await addTacheToExigence(tache7._id, exigence7._id);
	tache7 = await getTacheWithPopulate(tache7._id);

	// Insertion 8

	var tache8 = await createTache({
		label: "Suivi, mesure, analyse et évaluation : L'organisation évalue les performances en matière de sécurité de l'information et l'efficacité du smsi.",
		etat: "pas mis en oeuvre",
		clause: "clause 9.1"
	});

	tache8 = await addTacheToExigence(tache8._id, exigence9._id);
	tache8 = await getTacheWithPopulate(tache8._id);

	// Insertion 9

	var tache9 = await createTache({
		label: "Audit interne",
		etat: "pas mis en oeuvre",
		clause: "clause 9.2"
	});

	tache9 = await addTacheToExigence(tache9._id, exigence9._id);
	tache9 = await getTacheWithPopulate(tache9._id);

	// Insertion 10

	var tache10 = await createTache({
		label: "Management review",
		etat: "pas mis en oeuvre",
		clause: "clause 9.3"
	});

	tache10 = await addTacheToExigence(tache10._id, exigence9._id);
	tache10 = await getTacheWithPopulate(tache10._id);

	// Insertion 11

	var tache11 = await createTache({
		label: "Non-conformité et action corrective",
		etat: "pas mis en oeuvre",
		clause: "clause 10.1"
	});

	tache11 = await addTacheToExigence(tache11._id, exigence10._id);
	tache11 = await getTacheWithPopulate(tache11._id);



	/**
	 * Insertion des sous taches 
	 */
	// insertion 1 
	var sstache1 = await createSousTache({
		clause: "clause 4.1",
		date_debut: "", //"2021-12-31T23:00:00.000Z",
		date_fin: "", //"2022-02-28T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les problèmes externes et internes qui sont pertinents pour  l'objectifde l'organisation et qui affectent sa capacité à atteindre les résultats attendues de son SMSI."
	});
	sstache1 = await addSousTacheToTache(sstache1._id, tache1._id);
	sstache1 = await addSousTacheToExigence(sstache1._id, exigence4._id);
	sstache1 = await addSousTacheToPhase(sstache1._id, phase1._id);
	sstache1 = await getSousTacheWithPopulate(sstache1._id);

	// insertion 2 
	var sstache2 = await createSousTache({
		clause: "clause 4.2.1",
		date_debut: "", //"2022-01-01T23:00:00.000Z",
		date_fin: "", //"2022-03-01T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les parties intéressées pertinentes pour le  SMSI"
	});
	sstache2 = await addSousTacheToTache(sstache2._id, tache2._id);
	sstache2 = await addSousTacheToExigence(sstache2._id, exigence4._id);
	sstache2 = await addSousTacheToPhase(sstache2._id, phase1._id);
	sstache2 = await getSousTacheWithPopulate(sstache2._id);
	// insertion 3 
	var sstache3 = await createSousTache({
		clause: "clause 4.2.2",
		date_debut: "", //"2022-01-02T23:00:00.000Z",
		date_fin: "", //"2022-03-02T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les exigences de ces parties intéressées concernant la sécurité de l'information"
	});
	sstache3 = await addSousTacheToTache(sstache3._id, tache2._id);
	sstache3 = await addSousTacheToExigence(sstache3._id, exigence4._id);
	sstache3 = await addSousTacheToPhase(sstache3._id, phase1._id);
	sstache3 = await getSousTacheWithPopulate(sstache3._id);
	// insertion 4 
	var sstache4 = await createSousTache({
		clause: "clause 4.3",
		date_debut: "", //"2022-01-03T23:00:00.000Z",
		date_fin: "", //"2022-03-03T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les limites et l'applicabilité du SMSI "
	});
	sstache4 = await addSousTacheToTache(sstache4._id, tache3._id);
	sstache4 = await addSousTacheToExigence(sstache4._id, exigence4._id);
	sstache4 = await addSousTacheToPhase(sstache4._id, phase1._id);
	sstache4 = await getSousTacheWithPopulate(sstache4._id);
	// insertion 5 
	var sstache5 = await createSousTache({
		clause: "clause 6.1.1.4",
		date_debut: "", //"2022-01-04T23:00:00.000Z",
		date_fin: "", //"2022-03-04T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Planifier des actions pour faire face à ces risques et opportunités"
	});
	sstache5 = await addSousTacheToTache(sstache5._id, tache4._id);
	sstache5 = await addSousTacheToExigence(sstache5._id, exigence6._id);
	sstache5 = await addSousTacheToPhase(sstache5._id, phase1._id);
	sstache5 = await getSousTacheWithPopulate(sstache5._id);
	// insertion 6 
	var sstache6 = await createSousTache({
		clause: "clause 6.1.1.5.1",
		date_debut: "", //"2022-01-05T23:00:00.000Z",
		date_fin: "", //"2022-03-05T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Planifier comment intégrer et mettre en œuvre ces actions dans son SMSI"
	});
	sstache6 = await addSousTacheToTache(sstache6._id, tache4._id);
	sstache6 = await addSousTacheToExigence(sstache6._id, exigence6._id);
	sstache6 = await addSousTacheToPhase(sstache6._id, phase1._id);
	sstache6 = await getSousTacheWithPopulate(sstache6._id);

	// insertion 7 
	var sstache7 = await createSousTache({
		clause: "clause 6.1.1.5.2",
		date_debut: "", //"2022-01-06T23:00:00.000Z",
		date_fin: "", //"2022-03-06T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Planifier comment  évaluer l'efficacité de ces actions"
	});
	sstache7 = await addSousTacheToTache(sstache7._id, tache4._id);
	sstache7 = await addSousTacheToExigence(sstache7._id, exigence6._id);
	sstache7 = await addSousTacheToPhase(sstache7._id, phase1._id);
	sstache7 = await getSousTacheWithPopulate(sstache7._id);


	// insertion 8 
	var sstache8 = await createSousTache({
		clause: "clause 6.1.2",
		date_debut: "", //"2022-01-07T23:00:00.000Z",
		date_fin: "", //"2022-03-07T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Examen de l'exactitude des risques selon l'évalution du RSSI"
	});
	sstache8 = await addSousTacheToTache(sstache8._id, tache5._id);
	sstache8 = await addSousTacheToExigence(sstache8._id, exigence6._id);
	sstache8 = await addSousTacheToPhase(sstache8._id, phase1._id);
	sstache8 = await getSousTacheWithPopulate(sstache8._id);


	// insertion 9 
	var sstache9 = await createSousTache({
		clause: "clause 6.1.3.1",
		date_debut: "", //"2022-01-08T23:00:00.000Z",
		date_fin: "", //"2022-03-08T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Sélectionner les options appropriées de traitement des risques pour la sécurité de l'information, en tenant compte des résultats de l'évaluation des risques"
	});
	sstache9 = await addSousTacheToTache(sstache9._id, tache6._id);
	sstache9 = await addSousTacheToExigence(sstache9._id, exigence6._id);
	sstache9 = await addSousTacheToPhase(sstache9._id, phase1._id);
	sstache9 = await getSousTacheWithPopulate(sstache9._id);

	// insertion 10 
	var sstache10 = await createSousTache({
		clause: "clause 6.1.3.2",
		date_debut: "", //"2022-01-09T23:00:00.000Z",
		date_fin: "", //"2022-03-09T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer tous les contrôles nécessaires à la mise en œuvre des options de traitement des risques de sécurité de l'information choisies"
	});
	sstache10 = await addSousTacheToTache(sstache10._id, tache6._id);
	sstache10 = await addSousTacheToExigence(sstache10._id, exigence6._id);
	sstache10 = await addSousTacheToPhase(sstache10._id, phase1._id);
	sstache10 = await getSousTacheWithPopulate(sstache10._id);

	// insertion 11 
	var sstache11 = await createSousTache({
		clause: "clause 6.1.3.3",
		date_debut: "", //"2022-01-10T23:00:00.000Z",
		date_fin: "", //"2022-03-10T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Comparer les contrôles déterminés au 6.1.3.2 ci-dessus avec ceux de l'annexe A et vérifier qu'aucun contrôle nécessaire n'a été omis"
	});
	sstache11 = await addSousTacheToTache(sstache11._id, tache6._id);
	sstache11 = await addSousTacheToExigence(sstache11._id, exigence6._id);
	sstache11 = await addSousTacheToPhase(sstache11._id, phase1._id);
	sstache11 = await getSousTacheWithPopulate(sstache11._id);
	// insertion 12 
	var sstache12 = await createSousTache({
		clause: "clause 6.1.3.4",
		date_debut: "", //"2022-01-11T23:00:00.000Z",
		date_fin: "", //"2022-03-11T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Produire une déclaration d'applicabilité contenant les contrôles nécessaires (voir 6.1.3.2 et 6.1.3.3) et la justification des inclusions, qu'elles soient mises en œuvre ou non, et la justification des exclusions des contrôles de l'annexe A"
	});
	sstache12 = await addSousTacheToTache(sstache12._id, tache6._id);
	sstache12 = await addSousTacheToExigence(sstache12._id, exigence6._id);
	sstache12 = await addSousTacheToPhase(sstache12._id, phase1._id);
	sstache12 = await getSousTacheWithPopulate(sstache12._id);
	// insertion 13 
	var sstache13 = await createSousTache({
		clause: "clause 6.1.3.5",
		date_debut: "", //"2022-01-12T23:00:00.000Z",
		date_fin: "", //"2022-03-12T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Formuler un plan de traitement des risques de sécurité de l'information"
	});
	sstache13 = await addSousTacheToTache(sstache13._id, tache6._id);
	sstache13 = await addSousTacheToExigence(sstache13._id, exigence6._id);
	sstache13 = await addSousTacheToPhase(sstache13._id, phase1._id);
	sstache13 = await getSousTacheWithPopulate(sstache13._id);
	// insertion 14 
	var sstache14 = await createSousTache({
		clause: "clause 6.1.3.6",
		date_debut: "", //"2022-01-13T23:00:00.000Z",
		date_fin: "", //"2022-03-13T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Obtenir l'approbation des propriétaires de risques du plan de traitement des risques de sécurité de l'information et l'acceptation des risques résiduels de sécurité de l'information"
	});
	sstache14 = await addSousTacheToTache(sstache14._id, tache6._id);
	sstache14 = await addSousTacheToExigence(sstache14._id, exigence6._id);
	sstache14 = await addSousTacheToPhase(sstache14._id, phase1._id);
	sstache14 = await getSousTacheWithPopulate(sstache14._id);


	// insertion 15 
	var sstache15 = await createSousTache({
		clause: "clause 7.4.1",
		date_debut: "", //"2022-01-14T23:00:00.000Z",
		date_fin: "", //"2022-03-14T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer sur quoi communiquer"
	});
	sstache15 = await addSousTacheToTache(sstache15._id, tache7._id);
	sstache15 = await addSousTacheToExigence(sstache15._id, exigence7._id);
	sstache15 = await addSousTacheToPhase(sstache15._id, phase2._id);
	sstache15 = await getSousTacheWithPopulate(sstache15._id);
	// insertion 16 
	var sstache16 = await createSousTache({
		clause: "clause 7.4.2",
		date_debut: "", //"2022-01-15T23:00:00.000Z",
		date_fin: "", //"2022-03-15T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer quand communiquer"
	});
	sstache16 = await addSousTacheToTache(sstache16._id, tache7._id);
	sstache16 = await addSousTacheToExigence(sstache16._id, exigence7._id);
	sstache16 = await addSousTacheToPhase(sstache16._id, phase2._id);
	sstache16 = await getSousTacheWithPopulate(sstache16._id);
	// insertion 17 
	var sstache17 = await createSousTache({
		clause: "clause 7.4.3",
		date_debut: "", //"2022-01-16T23:00:00.000Z",
		date_fin: "", //"2022-03-16T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: " Déterminer avec qui communiquer"
	});
	sstache17 = await addSousTacheToTache(sstache17._id, tache7._id);
	sstache17 = await addSousTacheToExigence(sstache17._id, exigence7._id);
	sstache17 = await addSousTacheToPhase(sstache17._id, phase2._id);
	sstache17 = await getSousTacheWithPopulate(sstache17._id);
	// insertion 18 
	var sstache18 = await createSousTache({
		clause: "clause 7.4.4",
		date_debut: "", //"2022-01-17T23:00:00.000Z",
		date_fin: "", //"2022-03-17T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer qui doit communiquer"
	});
	sstache18 = await addSousTacheToTache(sstache18._id, tache7._id);
	sstache18 = await addSousTacheToExigence(sstache18._id, exigence7._id);
	sstache18 = await addSousTacheToPhase(sstache18._id, phase2._id);
	sstache18 = await getSousTacheWithPopulate(sstache18._id);
	// insertion 19 
	var sstache19 = await createSousTache({
		clause: "clause 7.4.5",
		date_debut: "", //"2022-01-18T23:00:00.000Z",
		date_fin: "", //"2022-03-18T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les processus par lesquels la communication doit être effectuée."
	});
	sstache19 = await addSousTacheToTache(sstache19._id, tache7._id);
	sstache19 = await addSousTacheToExigence(sstache19._id, exigence7._id);
	sstache19 = await addSousTacheToPhase(sstache19._id, phase2._id);
	sstache19 = await getSousTacheWithPopulate(sstache19._id);


	// insertion 20 
	var sstache20 = await createSousTache({
		clause: "clause 9.1.1",
		date_debut: "", //"2022-01-19T23:00:00.000Z",
		date_fin: "", //"2022-03-19T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer ce qui doit être surveillé et mesuré, y compris les processus et contrôles de sécurité de l'information;"
	});
	sstache20 = await addSousTacheToTache(sstache20._id, tache8._id);
	sstache20 = await addSousTacheToExigence(sstache20._id, exigence9._id);
	sstache20 = await addSousTacheToPhase(sstache20._id, phase3._id);
	sstache20 = await getSousTacheWithPopulate(sstache20._id);
	// insertion 21 
	var sstache21 = await createSousTache({
		clause: "clause 9.1.2",
		date_debut: "", //"2022-01-20T23:00:00.000Z",
		date_fin: "", //"2022-03-20T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les méthodes de surveillance, de mesure, d'analyse et d'évaluation, selon le cas, pour garantir des résultats valides"
	});
	sstache21 = await addSousTacheToTache(sstache21._id, tache8._id);
	sstache21 = await addSousTacheToExigence(sstache21._id, exigence9._id);
	sstache21 = await addSousTacheToPhase(sstache21._id, phase3._id);
	sstache21 = await getSousTacheWithPopulate(sstache21._id);
	// insertion 22 
	var sstache22 = await createSousTache({
		clause: "clause 9.1.3",
		date_debut: "", //"2022-01-21T23:00:00.000Z",
		date_fin: "", //"2022-03-21T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer quand le contrôle et la mesure doivent être effectués"
	});
	sstache22 = await addSousTacheToTache(sstache22._id, tache8._id);
	sstache22 = await addSousTacheToExigence(sstache22._id, exigence9._id);
	sstache22 = await addSousTacheToPhase(sstache22._id, phase3._id);
	sstache22 = await getSousTacheWithPopulate(sstache22._id);

	// insertion 23 
	var sstache23 = await createSousTache({
		clause: "clause 9.1.4",
		date_debut: "", //"2022-01-22T23:00:00.000Z",
		date_fin: "", //"2022-03-22T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer qui doit surveiller et mesurer"
	});
	sstache23 = await addSousTacheToTache(sstache23._id, tache8._id);
	sstache23 = await addSousTacheToExigence(sstache23._id, exigence9._id);
	sstache23 = await addSousTacheToPhase(sstache23._id, phase3._id);
	sstache23 = await getSousTacheWithPopulate(sstache23._id);

	// insertion 24 
	var sstache24 = await createSousTache({
		clause: "clause 9.1.5",
		date_debut: "", //"2022-01-23T23:00:00.000Z",
		date_fin: "", //"2022-03-23T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer quand les résultats de la surveillance et de la mesure doivent être analysés et évalués"
	});
	sstache24 = await addSousTacheToTache(sstache24._id, tache8._id);
	sstache24 = await addSousTacheToExigence(sstache24._id, exigence9._id);
	sstache24 = await addSousTacheToPhase(sstache24._id, phase3._id);
	sstache24 = await getSousTacheWithPopulate(sstache24._id);

	// insertion 25 
	var sstache25 = await createSousTache({
		clause: "clause 9.1.6",
		date_debut: "", //"2022-01-24T23:00:00.000Z",
		date_fin: "", //"2022-03-24T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer qui analysera et évaluera ces résultats"
	});
	sstache25 = await addSousTacheToTache(sstache25._id, tache8._id);
	sstache25 = await addSousTacheToExigence(sstache25._id, exigence9._id);
	sstache25 = await addSousTacheToPhase(sstache25._id, phase3._id);
	sstache25 = await getSousTacheWithPopulate(sstache25._id);

	// insertion 26 
	var sstache26 = await createSousTache({
		clause: "clause 9.2",
		date_debut: "", //"2022-01-25T23:00:00.000Z",
		date_fin: "", //"2022-03-25T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Audit interne"
	});
	sstache26 = await addSousTacheToTache(sstache26._id, tache9._id);
	sstache26 = await addSousTacheToExigence(sstache26._id, exigence9._id);
	sstache26 = await addSousTacheToPhase(sstache26._id, phase3._id);
	sstache26 = await getSousTacheWithPopulate(sstache26._id);

	// insertion 27 
	var sstache27 = await createSousTache({
		clause: "clause 9.3",
		date_debut: "", //"2022-01-26T23:00:00.000Z",
		date_fin: "", //"2022-03-26T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Management review"
	});
	sstache27 = await addSousTacheToTache(sstache27._id, tache10._id);
	sstache27 = await addSousTacheToExigence(sstache27._id, exigence9._id);
	sstache27 = await addSousTacheToPhase(sstache27._id, phase3._id);
	sstache27 = await getSousTacheWithPopulate(sstache27._id);

	// insertion 28 
	var sstache28 = await createSousTache({
		clause: "clause 10.2.1",
		date_debut: "", //"2022-01-27T23:00:00.000Z",
		date_fin: "", //"2022-03-27T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Examiner la non-conformité"
	});
	sstache28 = await addSousTacheToTache(sstache28._id, tache11._id);
	sstache28 = await addSousTacheToExigence(sstache28._id, exigence10._id);
	sstache28 = await addSousTacheToPhase(sstache28._id, phase4._id);
	sstache28 = await getSousTacheWithPopulate(sstache28._id);

	// insertion 29 
	var sstache29 = await createSousTache({
		clause: "clause 10.2.2",
		date_debut: "", //"2022-01-28T23:00:00.000Z",
		date_fin: "", //"2022-03-28T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer les causes de la non-conformité"
	});
	sstache29 = await addSousTacheToTache(sstache29._id, tache11._id);
	sstache29 = await addSousTacheToExigence(sstache29._id, exigence10._id);
	sstache29 = await addSousTacheToPhase(sstache29._id, phase4._id);
	sstache29 = await getSousTacheWithPopulate(sstache29._id);

	// insertion 30 
	var sstache30 = await createSousTache({
		clause: "clause 10.2.3",
		date_debut: "", //"2022-01-29T23:00:00.000Z",
		date_fin: "", //"2022-03-29T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Déterminer si des non-conformités similaires existent ou pourraient se produire"
	});
	sstache30 = await addSousTacheToTache(sstache30._id, tache11._id);
	sstache30 = await addSousTacheToExigence(sstache30._id, exigence10._id);
	sstache30 = await addSousTacheToPhase(sstache30._id, phase4._id);
	sstache30 = await getSousTacheWithPopulate(sstache30._id);

	// insertion 31 
	var sstache31 = await createSousTache({
		clause: "clause 10.4",
		date_debut: "", //"2022-01-30T23:00:00.000Z",
		date_fin: "", //"2022-03-30T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Examiner l'efficacité de toute mesure corrective prise"
	});
	sstache31 = await addSousTacheToTache(sstache31._id, tache11._id);
	sstache31 = await addSousTacheToExigence(sstache31._id, exigence10._id);
	sstache31 = await addSousTacheToPhase(sstache31._id, phase4._id);
	sstache31 = await getSousTacheWithPopulate(sstache31._id);

	// insertion 32 
	var sstache32 = await createSousTache({
		clause: "clause 10.5",
		date_debut: "", //"2022-01-31T23:00:00.000Z",
		date_fin: "", //"2022-03-31T23:00:00.000Z",
		etat: "pas mis en oeuvre",
		label: "Apporter des modifications au SMSI"
	});
	sstache32 = await addSousTacheToTache(sstache32._id, tache11._id);
	sstache32 = await addSousTacheToExigence(sstache32._id, exigence10._id);
	sstache32 = await addSousTacheToPhase(sstache32._id, phase4._id);
	sstache32 = await getSousTacheWithPopulate(sstache32._id);

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