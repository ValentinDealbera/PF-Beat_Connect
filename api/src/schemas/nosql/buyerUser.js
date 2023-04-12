const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const buyerUserSchema = mongoose.Schema({
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
  bougthBeats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beat",
    },
  ],
});

const saltRound = 10;
buyerUserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRound, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

buyerUserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(err, res);
    }
  });
};

module.exports = mongoose.model("BuyerUser", buyerUserSchema);
