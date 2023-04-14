const express = require("express");
const router = express();
const jwt = require("jsonwebtoken");
const userModel = require("../models/index");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND,
  SERVER_ERROR,
  ALL_OK,
  ALL_NOT_OK,
} = require("../controllers/status");

// router.post("/", async (req, res) => {
//   const { email, password } = req;

//   const user = await userModel.findOne({ email: email, password: password });

//   if (user) {
//     const token = jwt.sign({ userId: 123  }, "mi_clave_secreta", {
//       expiresIn: "1h",
//     });
//   }
// });

module.exports = router;
