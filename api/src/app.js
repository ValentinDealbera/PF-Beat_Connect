const express = require("express");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage";

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

//  Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnAf3vx_i2zgV01ucnMo8IDdvlnbYuDZM",
  authDomain: "beatconnet.firebaseapp.com",
  projectId: "beatconnet",
  storageBucket: "beatconnet.appspot.com",
  messagingSenderId: "97271416068",
  appId: "1:97271416068:web:c5514b7da5b8824c357c51",
  measurementId: "G-7RKC3EL1BB",
  storageBucket: 'gs://beatconnet.appspot.com'
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = server;

