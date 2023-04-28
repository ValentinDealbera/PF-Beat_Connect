const GenreModel = require("../../models/nosql/genre");

const getGenresController = async () => {
  const genres = await GenreModel.find({});
  return genres;
};

const getGenreId = async (id) => {
  try {
    let genresByID = await GenreModel.findById(id);
    return genresByID;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getGenresController, getGenreId };
