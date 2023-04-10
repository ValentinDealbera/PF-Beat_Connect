const mongoose = require("mongoose");

const userCreatorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: false,
    default:
      "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
  },
  createdBeats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beat",
    },
  ],
});

module.exports = mongoose.model("UserCreator", userCreatorSchema);
