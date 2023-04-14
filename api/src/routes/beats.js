const { Router } = require("express");
const router = Router();
const { initializeApp } = require("firebase/app");
const fs = require("fs");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject
} = require("firebase/storage");
const multer = require("multer");
const config = require("../../config/firebaseConfig");
const axios = require("axios");
const beatModel = require("../models/nosql/beats");

initializeApp(config.firebaseConfig);

const storage = getStorage();

router.get("/", async (req, res) => {
  try {
    const beats = await beatModel.find();
    res.status(200).json(beats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:beatId", async (req, res) => {
  try {
    if (!req.params) {
      const beats = await beatModel.find();
      res.status(200).json(beats);
    }
    const { beatId } = req.params;
    const beat = await beatModel.findById(beatId);
    res.status(200).json(beat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const comprobacion = await beatModel.findOne({ name: req.body.name });
  if (comprobacion) res.status(400).json({ error: "Ese Beat ya Existe" }).end();
  console.log(req.body);
  const imageData = fs.readFileSync(req.files.image.tempFilePath);
  const audioData = fs.readFileSync(req.files.audio.tempFilePath);
  try {
    const dateTime = giveCurrentDateTime();
    if (!comprobacion) {
      //-------------------------------------audio
      const audioStorageRef = ref(
        storage,
        `beats/${req.body.name}/audio/${
          req.files.audio.name + " - " + dateTime
        }`
      );

      const audioMetadata = {
        contentType: req.files.audio.mimetype,
      };

      const audioSnapshot = await uploadBytesResumable(
        audioStorageRef,
        audioData,
        audioMetadata
      );

      const downloadAudioURL = await getDownloadURL(audioSnapshot.ref);
      //------------------------------------------image
      const imageStorageRef = ref(
        storage,
        `beats/${req.body.name}/image/${
          req.files.image.name + " - " + dateTime
        }`
      );

      const imageMetadata = {
        contentType: req.files.image.mimetype,
      };

      const imageSnapshot = await uploadBytesResumable(
        imageStorageRef,
        imageData,
        imageMetadata
      );

      const downloadImageURL = await getDownloadURL(imageSnapshot.ref);

      console.log("successfully uploaded");

      const newBeat = await beatModel.create({
        audio: downloadAudioURL,
        image: downloadImageURL,
        name: req.body.name,
        priceAmount: 29.99,
      });

      return res.json(newBeat);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priceAmount, review, softDelete, genre } = req.body;
    const updatedBeat = await beatModel.findById(id);
    if (!updatedBeat) return res.status(400).json({ error: "Beat not Found" });
    if (name) updatedBeat.name = name;
    if (priceAmount) updatedBeat.priceAmount = Number(priceAmount);
    if (review) updatedBeat.review = review;
    if (softDelete) updatedBeat.softDelete = softDelete === 'true' ? true : false;
    if (genre) updatedBeat.genre = genre;
    updatedBeat.save();
    return res.status(200).json(updatedBeat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBeat = await beatModel.findByIdAndDelete(id);
    res.json(deletedBeat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = router;
