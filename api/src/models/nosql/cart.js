const mongoose = require("mongoose");

const CartModel = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  beats: [
    {
      beat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Beats",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", CartModel);
