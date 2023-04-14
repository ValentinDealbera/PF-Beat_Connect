const express = require("express");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const server = express();


server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);
server.use("/api", routes);

module.exports = server;
