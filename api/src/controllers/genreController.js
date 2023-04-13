const GenreModel = require("../models/nosql/genre");

const getGenresController = async () => {
  const genres = await GenreModel.find();
  return genres;
};

module.exports = getGenresController;
