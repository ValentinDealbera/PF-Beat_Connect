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

initializeApp(config.firebaseConfig);
const storage = getStorage();

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.files ? req.files.image : null;
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
    res.status(500).json({ message: error.message });
  }
};
