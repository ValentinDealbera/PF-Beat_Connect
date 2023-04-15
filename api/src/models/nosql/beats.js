const mongoose = require("mongoose");

const BeatsSchema = new mongoose.Schema({
  audioMP3: {
    type: String,
    require: true,
  },
  // audioWAV: {
  //   type: String,
  //   require: true,
  // },
  relevance: {
    type: Number,
    default: 0,
    require: true,
  },
  BPM: {
    type: Number,
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
      "https://cdn-icons-png.flaticon.com/512/65/65847.png?w=740&t=st=1681567451~exp=1681568051~hmac=2121c1d3f4322c3cf8318fa6ad1e6df0c4cef5c113158698efd46479dd8cc1e7",
  },
  priceAmount: {
    type: Number,
    default: 0,
    require: true,
  },
  genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
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
  userCreator:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  inCart:{
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Beats", BeatsSchema);
