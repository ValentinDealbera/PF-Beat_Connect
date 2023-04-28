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

initializeApp(config.firebaseConfig);

const storage = getStorage();

module.exports = async (req, res) => {
  const { userid } = req.headers;
  const { name, priceAmount, bpm, genre, userCreator } = req.body;
  console.log(req.body);
  if (!name || !priceAmount || !bpm || !genre || !userCreator)
    return res.status(400).json({ message: "Faltan datos" });

  console.log("procesando beat", req.headers);

  if (!userid) return res.status(400).json({ message: "No llego un id" });
  console.log("procesando beat");

  const comprobacion = await beatModel.findOne({ name: req.body.name });
  if (comprobacion) {
    if (comprobacion.name.toLocaleLowerCase() === req.body.name.toLowerCase())
      return res.status(400).json({ error: "Ese Beat ya Existe" }).end();
  }

  try {
    const creator = await userModel.findById(req.body.userCreator);
    const creatorAux = await userModel.findById(userid);
    const genre = await genreModel.findById(req.body.genre);

    if (creator.email !== creatorAux.email)
      return res
        .status(400)
        .json({ message: "No puedes publicar un beat a nombre de otro/a" });
    if (!genre)
      return res.status(400).json({ message: "Este genero no existe" });
    if (!creator)
      return res.status(400).json({ message: "Este usuario no existe" });

    if (!creator.isSeller)
      return res
        .status(400)
        .json({ message: "Este usuario no esta registrado como vendedor" });
    const audioMP3Data = fs.readFileSync(req.files.audioMP3.tempFilePath);
    const audioWAVData = fs.readFileSync(req.files.audioWAV.tempFilePath);

    if (
      !comprobacion &&
      audioWAVData &&
      audioMP3Data &&
      genre &&
      creator &&
      req.body.bpm
    ) {
      //-------------------------------------audio WAV
      const audioWAVStorageRef = ref(
        storage,
        `beats/${req.body.name}/audioWAV/${req.body.name}.wav`
      );

      const audioWAVMetadata = {
        contentType: req.files.audioMP3.mimetype,
      };

      const audioWAVSnapshot = await uploadBytesResumable(
        audioWAVStorageRef,
        audioWAVData,
        audioWAVMetadata
      );

      const downloadaudioWAVURL = await getDownloadURL(audioWAVSnapshot.ref);
      //-------------------------------------audio MP3
      const audioStorageRef = ref(
        storage,
        `beats/${req.body.name}/audioMP3/${req.body.name}.mp3`
      );

      const audioMetadata = {
        contentType: req.files.audioMP3.mimetype,
      };

      const audioSnapshot = await uploadBytesResumable(
        audioStorageRef,
        audioMP3Data,
        audioMetadata
      );

      const downloadAudioURL = await getDownloadURL(audioSnapshot.ref);
      //------------------------------------------image
      let downloadImageURL;
      if (req.files.image) {
        const imageData = fs.readFileSync(req.files.image.tempFilePath);
        const imageStorageRef = ref(
          storage,
          `beats/${req.body.name}/image/${req.body.name}`
        );

        const imageMetadata = {
          contentType: req.files.image.mimetype,
        };

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          imageData,
          imageMetadata
        );
        downloadImageURL = await getDownloadURL(imageSnapshot.ref);
      }
      console.log("successfully uploaded");

      const newBeat = await beatModel.create({
        audioMP3: downloadAudioURL,
        audioWAV: downloadaudioWAVURL,
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
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};