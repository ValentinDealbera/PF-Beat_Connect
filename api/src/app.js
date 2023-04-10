const express = require("express");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

server.use("/api", routes);

module.exports = server;
