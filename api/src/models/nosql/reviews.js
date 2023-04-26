const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    require: true,
  },
  title: {
    type: String,
    required: true,
  },
  softDelete: {
    type: Boolean,
    default: false
  },
  comment: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  beat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beats",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
