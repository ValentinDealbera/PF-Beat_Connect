const express = require("express");
const { buyerUser } = require("../Schemas/index");
const router = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwt_decode = require("jwt-decode");

module.exports = router;
