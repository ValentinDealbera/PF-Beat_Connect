const { getGenresController } = require("./genreController");

module.exports = async (req, res) => {
  try {
    const genres = await getGenresController();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
