const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId:{
    type: String,
    default: ''
  },
  name:{
    type: String
  },
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
  bio: {
    type: String,
    default: ''
  },
  backImage: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    require: false,
    default:
      "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
  softDelete: {
    type: Boolean,
    default: false,
  },
  accessToken: {
    type: String,
    default: ''
  },
  bougthBeats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beats",
    },
  ],
  userReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  createdBeats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beats",
    },
  ],
});


module.exports = mongoose.model("User", UserSchema);
