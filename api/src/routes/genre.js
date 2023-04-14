const express = require("express");
const router = express();
const {OK, BAD_REQUEST, GENRE_NOT_FOUND, NOT_FOUND} =  require('../controllers/status')
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
    const {name} = req.body;
  if(name === 'HIP-HOP' || name  === 'POP' || name  === 'R&B' || name  === 'ROCK' || name  === 'ELECTRONIC' || name  === 'REGGAE' ||name  === 'COUNTRY'){
    try {
      const genre = await GenreModel.create({ name: name });
      res.send(genre);
    } catch (err) {
      console.error(err);
    }

  } else res.status(NOT_FOUND).send({message: "El genero debe ser HIP-HOP o POP o R&B o ROCK o ELECTRONIC o REGGAE o COUNTRY "});
    
  });
  
module.exports = router;