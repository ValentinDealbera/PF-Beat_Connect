const GenreModel = require("../schemas/nosql/genre");

const getGenresController = async () => {
  const genres = await GenreModel.find();
  return genres;
};

module.exports = getGenresController;
