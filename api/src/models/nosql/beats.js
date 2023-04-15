const mongoose = require("mongoose");

const BeatsSchema = new mongoose.Schema({
  audio: {
    type: String,
    require: true,
  },
  id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
    require: false,
    default:
      "https://www.freepik.es/iconos-gratis/nota-musica_773968.htm#query=nota%20musical%20sola&position=43&from_view=search&track=ais",
  },
  priceAmount: {
    type: Number,
    default: 0,
    require: true,
  },
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  softDelete: {
    type: Boolean,
    default: false,
  },
  userCreator: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  inCart:{
    type: Boolean,
    defoult: false,
  }
});

module.exports = mongoose.model("Beats", BeatsSchema);
