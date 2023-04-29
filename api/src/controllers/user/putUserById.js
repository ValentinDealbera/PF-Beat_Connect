const UserModel = require("../../models/nosql/user");
const axios = require("axios");
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
const { getUserId } = require("./userController");
const sharp = require("sharp");
initializeApp(config.firebaseConfig);
const storage = getStorage();

module.exports = async (req, res) => {
  const { userid } = req.headers;
  //console.log(req.body);
  try {
    console.log("hacemos put");
    const { id } = req.params;
    const image = req.files ? req.files.image : null;
    const backImage = req.files ? req.files.backImage : null;
    const {
      favorite,
      mpcode,
      seller,
      admin,
      soft,
      username,
      firstName,
      lastName,
      email,
      bio,
      newPassword = "",
      oldPassword = "",
      bougthBeats,
    } = req.body;
    const userin = await UserModel.findById(id);
    const userAux = await UserModel.findById(userid);
    // console.log("userin >", userin, "userAux >", userAux);

    //si la contraseña nueva llega vacia, no se actualiza
    const userWantUpdatePassword = oldPassword && newPassword;
    const passwordIsValid = await bcrypt.compare(oldPassword, userin.password);

    if (!userin)
      return res
        .status(400)
        .json({ message: "El usuario que quieres actualizar no existe" });
    if (userin?.email !== userAux?.email)
      return res
        .status(400)
        .json({ message: "No puedes actualizar otro usuario!" });
    if (
      (seller && seller !== "VENDEDOR") ||
      (admin && admin !== "ADMIN") ||
      (soft && soft !== "DELETE")
    ) {
      return res.status(400).json({
        message:
          'seller debe ser "VENDEDOR", admin debe ser "ADMIN" o soft debe ser "DELETE"',
      });
    }
    if (oldPassword && newPassword && !passwordIsValid) {
      return res.status(400).json({
        message: "La contraseña no coincide con tu contraseña actual",
      });
    } else if (oldPassword && newPassword && oldPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "La nueva contraseña debe ser distinta a la actual" });
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
      newPassword ||
      oldPassword ||
      bougthBeats
    ) {
      const user = await UserModel.findById(id);
      if (favorite) {
        console.log("Añadimos el fav", favorite);
        if (!user.userFavorites.includes(favorite)) {
          user.userFavorites = [...user.userFavorites, favorite];
        } else {
          console.log("Borramos el fav", favorite);
          user.userFavorites = user.userFavorites.filter(
            (e) => e._id.toString() !== favorite
          );
          // const index = user.userFavorites.findIndex((e) => (e = favorite));
          // user.userFavorites = user.userFavorites.slice(index, index);
          //
          // user.userFavorites = user.userFavorites.filter((e) => e._id !== favorite);
        }
      }
      if (username && username !== "") user.username = username;
      if (firstName && firstName !== "") user.firstName = firstName;
      if (lastName && lastName !== "") user.lastName = lastName;
      if (email && email !== "") user.email = email;
      if (bio && bio !== "") user.bio = bio;
      if (newPassword && newPassword !== "") {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(newPassword, saltRounds);
        user.password = hashedPassword;
      }
      if (image) {
        const imageData = fs.readFileSync(image.tempFilePath);
        const imageStorageRef = ref(
          storage,
          `users/${user.username}/image/${user.username}`
        );

        const imageMetadata = {
          contentType: image.mimetype,
        };

        const imageBuffer = fs.readFileSync(req.files.image.tempFilePath);
        const resizedImageBuffer = await sharp(imageBuffer)
          .resize({ width: 800, height: 800 }) // Ajusta las dimensiones según tus requisitos
          .webp({ quality: 80 }) // Ajusta la calidad WebP según tus necesidades
          .toBuffer();

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          resizedImageBuffer,
          imageMetadata
        );
        const downloadImageURL = await getDownloadURL(imageSnapshot.ref);
        user.image = downloadImageURL;
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

        const imageBuffer = fs.readFileSync(req.files.image.tempFilePath);
        const resizedImageBuffer = await sharp(imageBuffer)
          .resize({ width: 800, height: 800 }) // Ajusta las dimensiones según tus requisitos
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
      if (seller && mpcode) {
        try {
          const code = req.body.mpcode;
          const userId = await getUserId(id);
          const body = {
            client_id: 8125390419773749,
            client_secret: "QkAwOW6BAQthSH0pOzOmoc9aPumLLKRi",
            code: code,
            grant_type: "authorization_code",
            redirect_uri: "https://pf-beat-connect.vercel.app/",
          };
          const access_token = await axios.post(
            `https://api.mercadopago.com/oauth/token`,
            body
          );
          if (userId) {
            userId.accessToken = access_token.data.access_token;
            userId.isSeller = true;
            await userId.save();
            return res.status(200).json({ message: "Ahora eres vendedor!" });
          } else {
            return res.status(404).json({
              message: "El id del usuario no fue encontrado o no existe",
            });
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
      user.save();
      res.status(200).json(user);
    } else
      return res
        .status(500)
        .json({ message: "el usuario no se ha modificado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
