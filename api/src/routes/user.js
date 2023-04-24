const express = require("express");
const router = express();
const mongoose = require("mongoose");
const UserModel = require("../models/nosql/user");
const beatModel = require("../models/nosql/beats");
const ReviewModel = require("../models/nosql/reviews");
const axios = require("axios");
const { v4 } = require("uuid");
const uuid4 = v4();
const config = require("../../config/firebaseConfig");
const bcrypt = require("bcrypt");
const { initializeApp } = require("firebase/app");
const fs = require("fs");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} = require("firebase/storage");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND,
  SERVER_ERROR,
  ALL_OK,
  ALL_NOT_OK,
} = require("../controllers/status");
const { getActiveUser, getUserId } = require("../controllers/userController");
const adminMiddleware = require("../middleware/adminVerify");
const { UUID } = require("bson");

initializeApp(config.firebaseConfig);

const storage = getStorage();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find()
      .populate("createdBeats")
      .populate("bougthBeats");
    res.json(users);
  } catch (err) {
    return res.status(SERVER_ERROR).send(USER_NOT_FOUND);
  }
});

router.get("/:id", async (req, res) => {
  try {
  } catch (error) {}
  const { id } = req.params;
  try {
    const allUserId = await UserModel.findById(id)
      .populate({
        path: "createdBeats",
        populate: [
          {
            path: "genre",
            model: "Genre",
          },
          {
            path: "review",
            model: "Review",
          },
          {
            path: "userCreator",
            model: "User",
          },
        ],
      })
      .populate({
        path: "bougthBeats",
        populate: [
          {
            path: "genre",
            model: "Genre",
          },
          {
            path: "review",
            model: "Review",
          },
        ],
      });
    allUserId
      ? res.status(OK).send(allUserId)
      : res.status(NOT_FOUND).send(USER_NOT_FOUND);
  } catch (err) {
    return res.status(NOT_FOUND).send(USER_NOT_FOUND);
  }
});

router.post("/admin", adminMiddleware, async (req, res) => {
  const { body } = req;
  if (body.image === "") delete body.image;
  try {
    const user = await UserModel.create(body);
    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { userid } = req.headers;
  try {
    const { id } = req.params;
    const image = req.files ? req.files.image : null;
    const backImage = req.files ? req.files.backImage : null;
    const {
      mpcode,
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
    } = req.body;
    const userin = await UserModel.findById(id);
    const userAux = await UserModel.findById(userid);
    if (!userin)
      return res
        .status(400)
        .json({ message: "El usuario que quieres actualizar no existe" });
    if (userin.email !== userAux.email)
      return res
        .status(400)
        .json({ message: "No puedes actualizar otro usuario!" });
    if (
      (seller && seller !== "VENDEDOR") ||
      (admin && admin !== "ADMIN") ||
      (soft && soft !== "DELETE")
    ) {
      return res.status(BAD_REQUEST).send(ALL_NOT_OK);
    }
    if (
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
      if (image) {
        const imageData = fs.readFileSync(image.tempFilePath);
        const imageStorageRef = ref(
          storage,
          `users/${user.username}/image/${user.username}`
        );

        const imageMetadata = {
          contentType: image.mimetype,
        };

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          imageData,
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

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          imageData,
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
            return res.status(OK).send(ALL_OK);
          } else {
            return res.status(NOT_FOUND).send(USER_NOT_FOUND);
          }
        } catch (err) {
          res.status(SERVER_ERROR).send(err.message);
        }
      }
      user.save();
      res.status(200).json(user);
    } else
      return res
        .status(500)
        .json({ message: "el usuario no se ha modificado" });
  } catch (error) {
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
});

router.put("/admin/:id", adminMiddleware, async (req, res) => {
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
    } = req.body;
    if (
      (seller && seller !== "VENDEDOR") ||
      (admin && admin !== "ADMIN") ||
      (soft && soft !== "DELETE")
    ) {
      return res
        .status(BAD_REQUEST)
        .send(
          'seller debe ser "VENDEDOR", admin debe ser "ADMIN" o soft debe ser "DELETE'
        );
    }

    if (
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
        const imageData = fs.readFileSync(image.tempFilePath);
        console.log("Procesando imagen");
        const imageStorageRef = ref(
          storage,
          `users/${user.username}/image/${user.username}`
        );

        const imageMetadata = {
          contentType: image.mimetype,
        };

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          imageData,
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

        const imageSnapshot = await uploadBytesResumable(
          imageStorageRef,
          imageData,
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
    return res.status(SERVER_ERROR).json({ message: error.message });
  }
});

router.delete("/admin/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Elimina review creada x el usuario
    await ReviewModel.deleteMany({ createdBy: id });

    // Todos los beats creados por el usuario
    const userBeats = await beatModel.find({ userCreator: id });
    // Elimino todos los beats del usuario
    await beatModel.deleteMany({ userCreator: id });

    // Elimino review asociadas con los beats del usuario.
    await ReviewModel.deleteMany({
      beat: { $in: userBeats.map((beat) => beat._id) },
    });

    // Elimino el usuario
    await UserModel.findByIdAndDelete(id);

    res.json({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.error(error);
    res.json({ error: error.message }).status(SERVER_ERROR);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.headers;
    const user = await UserModel.findById(id);
    const userAux = await UserModel.findById(userid);
    if (!user)
      return res
        .status(400)
        .json({ message: "El usuario que quieres eliminar no existe" });
    if (user.email !== userAux.email)
      return res
        .status(400)
        .json({ message: "No puedes eliminar otro usuario!" });
    try {
      // Elimina review creada x el usuario
      await ReviewModel.deleteMany({ createdBy: id });

      // Todos los beats creados por el usuario
      const userBeats = await beatModel.find({ userCreator: id });
      // Elimino todos los beats del usuario
      await beatModel.deleteMany({ userCreator: id });

      // Elimino review asociadas con los beats del usuario.
      await ReviewModel.deleteMany({
        beat: { $in: userBeats.map((beat) => beat._id) },
      });

      // Elimino el usuario
      await UserModel.findByIdAndDelete(id);

      res.json({ message: "Usuario eliminado con éxito." });
    } catch (error) {
      console.error(error);
      res.json({ error: error.message }).status(SERVER_ERROR);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/******************************************** RECUPERACION DE CONTRASENA *******************************************/

router.post("/recuperar-contraseña", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  try {
    if (!user) {
      return res.status(NOT_FOUND).send(USER_NOT_FOUND);
    }
    axios.post(BACKEND_URL + "api/mail/password", { email: email });
  } catch (err) {
    res.status(SERVER_ERROR).send(ALL_NOT_OK);
  }
});

module.exports = router;
