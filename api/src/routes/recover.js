const express = require("express");
const router = express();
const mongoose = require("mongoose");
const UserModel = require("../models/nosql/user");
const axios = require("axios");
const { v4 } = require("uuid");
const uuid4 = v4();
const config = require("../../config/firebaseConfig");
const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const fs = require("fs");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
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
const { getActiveUser, getUserId } = require("../controllers/userController");
const adminMiddleware = require("../middleware/adminVerify");
const { UUID } = require("bson");

initializeApp(config.firebaseConfig);

const storage = getStorage();

router.post("/recuperar-contraseña", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(BAD_REQUEST).send(ALL_NOT_OK);

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(NOT_FOUND).send(USER_NOT_FOUND);
    }
    axios.post(BACKEND_URL + "api/mail/password", { email: email });
  } catch (err) {
    res.status(SERVER_ERROR).json({ message: ALL_NOT_OK });
  }
});

router.put("/password", async (req, res) => {
  const { newPassword, email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
    user.password = hashedPassword;
    user.save();
    res
      .status(OK)
      .json({ message: "La contraseña fue actualizada correctamente!" });
  } catch (err) {
    res.status(SERVER_ERROR).json({ message: ALL_NOT_OK });
  }
});

module.exports = router;
