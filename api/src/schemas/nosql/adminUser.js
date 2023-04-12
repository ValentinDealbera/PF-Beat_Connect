const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminUserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  softDelete: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: true,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
});

const saltRound = 10;
adminUserSchema.pre("save", function (next) {
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

adminUserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(err, res);
    }
  });
};

module.exports = mongoose.model("AdminUser", adminUserSchema);
