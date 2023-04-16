const mongoose = require("mongoose");


const GenreSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("Genre", GenreSchema);
