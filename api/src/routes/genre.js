const express = require("express");
const router = express();
const {OK, BAD_REQUEST, GENRE_NOT_FOUND} =  require('../controllers/status')
const {getGenresController, getGenreId} = require('../controllers/genreController')
const GenreModel = require("../models/nosql/genre")

router.get("/", async (req, res) => {

    try {
      const genres = await getGenresController();
      res.status(OK).json(genres);
    } catch (error) {
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  });


  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const genreId = await getGenreId(id);
      genreId
        ? res.status(OK).send(genreId)
        : res.status(NOT_FOUND).send(GENRE_NOT_FOUND);
    } catch (err) {
      res.status(NOT_FOUND).send(GENRE_NOT_FOUND);
    }
  });

  router.post("/", async (req, res) => {
    const {body} = req;
  
    try {
      const genre = await GenreModel.create(body);
      res.send(genre);
    } catch (err) {
      console.error(err.message);
    }
  });
  
module.exports = router;