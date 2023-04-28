const express = require("express");
const router = express();

const config = require("../../config/firebaseConfig");
const { initializeApp } = require("firebase/app");
initializeApp(config.firebaseConfig);

const getAllUsers = require("../controllers/user/getAllUsers");
const getUserById = require("../controllers/user/getUserById");
const putUserById = require("../controllers/user/putUserById");
const deleteUserById = require("../controllers/user/deleteUserById");

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.put("/:id", putUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
