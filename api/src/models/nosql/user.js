const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
