const express = require("express");
const router = express();

/* ----------- Controllers ----------- */

const getAllGenres = require("../controllers/genre/getAllGenres");
const getGenreById = require("../controllers/genre/getGenreById");
const postGenres = require("../controllers/genre/postGenres");

router.get("/", getAllGenres);

router.get("/:id", getGenreById);

// router.post("/", postGenres); DEPRECATED

module.exports = router;
