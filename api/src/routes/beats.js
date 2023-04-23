const { Router } = require("express");
const router = Router();
const { initializeApp } = require("firebase/app");
const fs = require("fs");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../../config/firebaseConfig");
const beatModel = require("../models/nosql/beats");
const userModel = require("../models/nosql/user");
const genreModel = require("../models/nosql/genre");
const reviewModel = require("../models/nosql/reviews");
const adminMiddleware = require("../middleware/adminVerify");

initializeApp(config.firebaseConfig);

const storage = getStorage();

router.get("/", async (req, res) => {


  const page = req.query.page || 1;
  const limit = req.query.limit || 5;
  const { name, priceAmount, BPM } = req.query;
  const genres = req.headers.genre ? req.headers.genre.split(",") : [""];


  console.log(genres);

  let sortBy;
  if (name) {
    sortBy = { name };
  }
  if (BPM) {
    sortBy = { BPM };
  }
  if (priceAmount) {
    sortBy = { priceAmount };
  }



  const minMaxFiltersFunction = ({ minPrice, maxPrice, minBPM, maxBPM }) => {
    let filters = {};
    minPrice &&
      (filters.priceAmount = { ...filters.priceAmount, $gt: minPrice - 0.01 });
    maxPrice &&
      (filters.priceAmount = {
        ...filters.priceAmount,
        $lt: maxPrice * 1 + 0.01,
      });
    minBPM && (filters.BPM = { ...filters.BPM, $gt: minBPM - 0.01 });
    maxBPM && (filters.BPM = { ...filters.BPM, $lt: maxBPM * 1 + 0.01 });
    return filters;
  };



  const minMaxFilters = minMaxFiltersFunction(req.query);

  try {
    const beats = await beatModel.paginate(
      {
        ...(genres && genres[0] !== "" && { genre: { $in: genres } }),
        ...(minMaxFilters && { ...minMaxFilters }),
      },
      {
        limit,
        page,
        sort: sortBy,
        collation: {
          locale: "en",
        },
        populate: ["userCreator", "genre"],
      }
    );

    res.status(200).json(beats);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:beatId", async (req, res) => {
  try {
    const { beatId } = req.params;
    const beat = await beatModel
      .findById(beatId)
      .populate("userCreator")
      .populate("genre");
    res.status(200).json(beat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { userid } = req.headers;

  console.log("procesando beat");

  const comprobacion = await beatModel.findOne({ name: req.body.name });
  if (comprobacion) {
    if (comprobacion.name.toLocaleLowerCase() === req.body.name.toLowerCase())
      return res.status(400).json({ error: "Ese Beat ya Existe" }).end();
  }
  const creator = await userModel.findById(req.body.userCreator);
  const creatorAux = await userModel.findById(userid);
  const genre = await genreModel.findById(req.body.genre);
  if (creator.email !== creatorAux.email)
    return res
      .status(400)
      .json({ message: "No puedes publicar un beat a nombre de otro/a" });
  if (!genre) return res.status(400).json({ message: "Este genero no existe" });
  if (!creator)
    return res.status(400).json({ message: "Este usuario no existe" });
  if (!creator.isSeller)
    return res
      .status(400)
      .json({ message: "Este usuario no esta registrado como vendedor" });
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
        `beats/${req.body.name}/audioMP3/${req.body.name}`
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
    res.status(500).send(error.message);
  }
});

router.post("/admin", adminMiddleware, async (req, res) => {
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
        }`
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
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.headers;
    const { image } = req.files;
    const { name, priceAmount, review, softDelete, genre, relevance } =
      req.body;
    const updatedBeat = await beatModel.findById(id).populate("userCreator");
    const userAux = await userModel.findById(userid);
    if (!updatedBeat)
      return res.status(400).json({ message: "Este beat no existe" });
    if (updatedBeat.userCreator.email !== userAux.email)
      return res.status(400).json({
        message: "No puedes modificar un beat que no sea de tu autoria",
      });
    if (name) updatedBeat.name = name;
    if (priceAmount) updatedBeat.priceAmount = Number(priceAmount);
    if (review) updatedBeat.review = [...updatedBeat.review, review];
    if (softDelete)
      updatedBeat.softDelete = softDelete === "true" ? true : false;
    if (genre) updatedBeat.genre = genre;
    if (image) {
      const imageData = fs.readFileSync(image.tempFilePath);
      const imageStorageRef = ref(
        storage,
        `beats/${updatedBeat.name}/image/${updatedBeat.name}`
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
      updatedBeat.image = downloadImageURL;
    }
    if (relevance)
      updatedBeat.relevance = relevance === "+" && updatedBeat.relevance + 1;
    updatedBeat.save();
    return res.status(200).json(updatedBeat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/admin/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
      const image = req.files ? req.files.image : null
    const { name, priceAmount, review, softDelete, genre, relevance } =
      req.body;
    const updatedBeat = await beatModel.findById(id);
    if (!updatedBeat) return res.status(400).json({ error: "Beat not Found" });
    if (name) updatedBeat.name = name;
    if (priceAmount) updatedBeat.priceAmount = Number(priceAmount);
    if (review) updatedBeat.review = [...updatedBeat.review, review];
    if (softDelete)
      updatedBeat.softDelete = softDelete === "true" ? true : false;
    if (genre) updatedBeat.genre = genre;
    if (image) {
      const imageData = fs.readFileSync(image.tempFilePath);
      const imageStorageRef = ref(
        storage,
        `beats/${updatedBeat.name}/image/${updatedBeat.name}`
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
      updatedBeat.image = downloadImageURL;
    }
    if (relevance) updatedBeat.relevance = Number(relevance);
    updatedBeat.save();
    return res.status(200).json(updatedBeat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/admin/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const beat = await beatModel.findById(id);
    if (!beat) return res.status(400).json({ message: "Este beat no existe" });
    const deletedBeat = await beatModel.findByIdAndDelete(id);

    const user = await userModel.findById(deletedBeat.userCreator);
    const beatIndex = user.createdBeats.findIndex(
      (beat) => beat._id === deletedBeat._id
    );
    const deletedBeatInUser = user.createdBeats.splice(beatIndex, 1);
    await user.save();

    const reviewsDeletedInConsequence = await reviewModel.deleteMany({
      beat: deletedBeat._id,
    });

    res.json(deletedBeat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userid } = req.headers;
  console.log(req.headers);
  console.log(id, userid);

  try {
    const beat = await beatModel.findById(id).populate("userCreator");
    const userAux = await userModel.findById(userid);
    console.log(beat.userCreator._id, userAux._id);
    if (!beat) return res.status(400).json({ message: "Este beat no existe" });
    if (beat.userCreator.email !== userAux.email)
      return res.status(400).json({
        message: "No puedes eliminar un beat que no sea de tu autoria",
      });
    const deletedBeat = await beatModel.findByIdAndDelete(id);

    const user = await userModel.findById(deletedBeat.userCreator);
    const beatIndex = user.createdBeats.findIndex(
      (beat) => beat._id === deletedBeat._id
    );
    const deletedBeatInUser = user.createdBeats.splice(beatIndex, 1);
    await user.save();

    const reviewsDeletedInConsequence = await reviewModel.deleteMany({
      beat: deletedBeat._id,
    });

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
