const GenreModel = require("../../models/nosql/genre");

module.exports = async (req, res) => {
  const { name } = req.body;
  try {
    if (
      name === "HIP-HOP" ||
      name === "POP" ||
      name === "R&B" ||
      name === "ROCK" ||
      name === "ELECTRONIC" ||
      name === "REGGAE" ||
      name === "COUNTRY"
    ) {
      const genre = await GenreModel.create({ name: name });
      res.status(200).send(genre);
    } else
      return res.status(404).send({
        message:
          "El genero debe ser HIP-HOP o POP o R&B o ROCK o ELECTRONIC o REGGAE o COUNTRY ",
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
