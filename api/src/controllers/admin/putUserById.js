const UserModel = require("../../models/nosql/user");
const config = require("../../../config/firebaseConfig");
const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const fs = require("fs");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const sharp = require("sharp");

initializeApp(config.firebaseConfig);

const storage = getStorage();

module.exports = async (req, res) => {
  try {
    console.log("-------------", req);
    const { id } = req.params;
    const image = req.files ? req.files.image : null;
    console.log("ESTA ES LA IMAGEN Y COMO LLEGA", image);
    const backImage = req.files ? req.files.backImage : null;
    const {
      seller,
      admin,
      soft,
      username,
      firstName,
      lastName,
      email,
      bio,
      password,
      bougthBeats,
      favorite,
    } = req.body;
    if (
      (seller && seller !== "VENDEDOR") ||
      (admin && admin !== "ADMIN") ||
      (soft && soft !== "DELETE")
    ) {
      return res.status(400).json({
        message:
          'seller debe ser "VENDEDOR", admin debe ser "ADMIN" o soft debe ser "DELETE',
      });
    }

    if (
      favorite ||
      backImage ||
      image ||
      soft ||
      admin ||
      seller ||
      username ||
      firstName ||
      lastName ||
      email ||
      bio ||
      password ||
      bougthBeats
    ) {
      const user = await UserModel.findById(id);
      if (favorite) {
        if (!user.userFavorites.includes(favorite)) {
          user.userFavorites = [...user.userFavorites, favorite];
        } else {
          const index = user.userFavorites.findIndex((e) => (e = favorite));
          user.userFavorites = user.userFavorites.slice(index, index);
        }
      }
      if (username && username !== "") user.username = username;
      if (firstName && firstName !== "") user.firstName = firstName;
      if (lastName && lastName !== "") user.lastName = lastName;
      if (email && email !== "") user.email = email;
      if (bio && bio !== "") user.bio = bio;
      if (password && password !== "") {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        user.password = hashedPassword;
      }
      if (seller) user.isSeller = !user.isSeller;
      if (admin) user.superAdmin = !user.superAdmin;
      if (soft) user.softDelete = !user.softDelete;
      if (image) {
        console.log("imagen existe", image);
        const imageData = fs.readFileSync(image.tempFilePath);
        console.log("Procesando imagen");
        const imageStorageRef = ref(
          storage,
          `users/${user.username}/image/${user.username}`
        );

        const imageMetadata = {
          contentType: image.mimetype,
        };

        const imageBuffer = fs.readFileSync(req.files.image.tempFilePath);
        const resizedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 400, height: 400 }) // Ajusta las dimensiones según tus requisitos
        .webp({ quality: 80 }) // Ajusta la calidad WebP según tus necesidades
          .toBuffer();

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          resizedImageBuffer,
          imageMetadata
        );
        const downloadImageURL = await getDownloadURL(imageSnapshot.ref);
        user.image = downloadImageURL ? downloadImageURL : user.image;
        console.log("Imagen subida");
      }
      if (backImage) {
        const imageData = fs.readFileSync(backImage.tempFilePath);
        const imageStorageRef = ref(
          storage,
          `users/${user.username}/backImage/${user.username}`
        );

        const imageMetadata = {
          contentType: backImage.mimetype,
        };

        const imageBuffer = fs.readFileSync(req.files.backImage.tempFilePath);
        const resizedImageBuffer = await sharp(imageBuffer)
          .resize({ width: 1500, height: 800 }) // Ajusta las dimensiones según tus requisitos
          .webp({ quality: 80 }) // Ajusta la calidad WebP según tus necesidades
          .toBuffer();

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          resizedImageBuffer,
          imageMetadata
        );
        const downloadBackImageURL = await getDownloadURL(imageSnapshot.ref);
        user.backImage = downloadBackImageURL;
      }
      user.save();
      res.status(200).json(user);
    } else
      return res
        .status(500)
        .json({ message: "el usuario no se ha modificado" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
