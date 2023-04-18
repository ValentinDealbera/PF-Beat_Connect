const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  beat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beats",
    },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  },
  seller:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
        type: String,
    }
});

module.exports = mongoose.model("Orders", OrdersSchema);
