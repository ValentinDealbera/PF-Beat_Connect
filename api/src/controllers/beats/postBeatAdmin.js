const { initializeApp } = require("firebase/app");
const fs = require("fs");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../../../config/firebaseConfig");
const beatModel = require("../../models/nosql/beats");
const userModel = require("../../models/nosql/user");
const genreModel = require("../../models/nosql/genre");
const sharp = require("sharp");
initializeApp(config.firebaseConfig);
const storage = getStorage();

module.exports = async (req, res) => {
  const comprobacion = await beatModel.findOne({ name: req.body.name });
  if (comprobacion) {
    if (comprobacion.name.toLocaleLowerCase() === req.body.name.toLowerCase())
      return res.status(400).json({ error: "Ese Beat ya Existe" }).end();
  }
  const creator = await userModel.findById(req.body.userCreator);
  const genre = await genreModel.findById(req.body.genre);
  if (!genre) return res.status(400).json({ message: "Este genero no existe" });
  if (!creator)
    return res.status(400).json({ message: "Este usuario no existe" });
  const audioMP3Data = fs.readFileSync(req.files.audioMP3.tempFilePath);
  // const audioWAVData = fs.readFileSync(req.files.audioWAV.tempFilePath);
  try {
    const dateTime = giveCurrentDateTime();
    if (!comprobacion && audioMP3Data && genre && creator && req.body.bpm) {
      //-------------------------------------audio WAV
      // const audioWAVStorageRef = ref(
      //   storage,
      //   `beats/${req.body.name}/audioWAV/${
      //     req.files.audioWav.name + " - " + dateTime
      //   }`
      // );

      // const audioWAVMetadata = {
      //   contentType: req.files.audioMP3.mimetype,
      // };

      // const audioWAVSnapshot = await uploadBytesResumable(
      //   audioWAVStorageRef,
      //   audioWAVData,
      //   audioWAVMetadata
      // );

      // const downloadaudioWAVURL = await getDownloadURL(audioWAVSnapshot.ref);
      //-------------------------------------audio MP3
      const audioStorageRef = ref(
        storage,
        `beats/${req.body.name}/audioMP3/${
          req.files.audioMP3.name + " - " + dateTime
        }`,
      );

      const audioMetadata = {
        contentType: req.files.audioMP3.mimetype,
      };

      const audioSnapshot = await uploadBytesResumable(
        audioStorageRef,
        audioMP3Data,
        audioMetadata,
      );

      const downloadAudioURL = await getDownloadURL(audioSnapshot.ref);
      //------------------------------------------image
      let downloadImageURL;
      if (req.files.image) {
        const imageData = fs.readFileSync(req.files.image.tempFilePath);
        const imageStorageRef = ref(
          storage,
          `beats/${req.body.name}/image/${
            req.files.image.name + " - " + dateTime
          }`,
        );

        const imageMetadata = {
          contentType: req.files.image.mimetype,
        };

        const imageBuffer = fs.readFileSync(req.files.image.tempFilePath);
        const resizedImageBuffer = await sharp(imageBuffer)
          .resize({ width: 400, height: 400 }) // Ajusta las dimensiones según tus requisitos
          .webp({ quality: 80 }) // Ajusta la calidad WebP según tus necesidades
          .toBuffer();

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          resizedImageBuffer,
          imageMetadata,
        );
        downloadImageURL = await getDownloadURL(imageSnapshot.ref);
      }
      console.log("successfully uploaded");

      const newBeat = await beatModel.create({
        audioMP3: downloadAudioURL,
        // audioWAV: downloadaudioWAVURL,
        BPM: Number(req.body.bpm),
        image: downloadImageURL,
        name: req.body.name,
        priceAmount: Number(req.body.priceAmount),
        userCreator: creator._id,
        genre: genre._id,
      });

      creator.createdBeats = [...creator.createdBeats, newBeat._id];
      creator.save();

      return res.json(newBeat);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};
