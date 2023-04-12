const express = require("express");
const router = express();
/*const  GenreModel = require('../schemas/index');
const {OK, BAD_REQUEST} =  require('../controllers/status')

router.get("/", async (req, res) => {
    try {
      const genres = await GenreModel.find();
      res.status(OK).json(genres);
    } catch (error) {
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  });*/

module.exports = router;