const mongoose = require("mongoose");

const validGenres = [
  "HIP-HOP",
  "POP",
  "R&B",
  "ROCK",
  "ELECTRONIC",
  "REGGAE",
  "COUNTRY",
];

const GenreSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    require: true,
    enum: validGenres,
  },
});

module.exports = mongoose.model("Genre", GenreSchema);
