const express = require("express");
const router = express();
const {OK, BAD_REQUEST} =  require('../controllers/status')
const getGenresController = require('../controllers/genreController')

router.get("/", async (req, res) => {

      const genres = await getGenresController();

    try {
      res.status(OK).json(genres);
    } catch (error) {
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  });

module.exports = router;