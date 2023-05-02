const { Router } = require("express");
const { initializeApp } = require("firebase/app");
const config = require("../../config/firebaseConfig");

/* ----------- Controllers ----------- */
const getBeats = require("../controllers/beats/getBeats");
const getBeatById = require("../controllers/beats/getBeatById");
const postBeat = require("../controllers/beats/postBeat");
const putBeatById = require("../controllers/beats/putBeatById");
const deleteBeatById = require("../controllers/beats/deleteBeatById");

initializeApp(config.firebaseConfig);

const router = Router();

/* ----------- GET ----------- */

router.get("/", getBeats);

router.get("/:beatId", getBeatById);

/* ----------- POST ----------- */

router.post("/", postBeat);

/* ----------- PUT ----------- */

router.put("/:id", putBeatById);

/* ----------- DELETE ----------- */

router.delete("/:id", deleteBeatById);

module.exports = router;
