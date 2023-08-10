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
const sharp = require("sharp");
initializeApp(config.firebaseConfig);
const storage = getStorage();

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const image = req.files ? req.files.image : null;
    const backImage = req.files ? req.files.backImage : null;
    const {
      favorite,
      mpcode,
      seller,
      username,
      firstName,
      lastName,
      email,
      bio,
      newPassword = "",
      oldPassword = "",
    } = req.body;

    const user = await UserModel.findById(id);
    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

    validateUserExistence(user, res);
    validateEmailMatch(user.email, user.email, res);
    validateRoleValues(req.body, res);
    validatePasswordChange(
      req.body.oldPassword,
      req.body.newPassword,
      passwordIsValid,
      res
    );

    if (favorite) {
      if (!user.userFavorites.includes(favorite)) {
        user.userFavorites = [...user.userFavorites, favorite];
      } else {
        user.userFavorites = user.userFavorites.filter(
          (e) => e._id.toString() !== favorite
        );
      }
    }

    if (username && username !== "") user.username = username;
    if (firstName && firstName !== "") user.firstName = firstName;
    if (lastName && lastName !== "") user.lastName = lastName;
    if (email && email !== "") user.email = email;
    if (bio && bio !== "") user.bio = bio;
    if (newPassword && newPassword !== "")
      user.password = passwordHasher(newPassword);

    if (image) {
      user.image = await uploadAndResizeImage(
        storage,
        image,
        `users/${user.username}/image/${user.username}`,
        400,
        400
      );
    }

    if (backImage) {
      user.backImage = await uploadAndResizeImage(
        storage,
        backImage,
        `users/${user.username}/backImage/${user.username}`,
        1500,
        800
      );
    }

    if (seller && mpcode) {
      const isIntegrationSuccessful = await integrateAsSeller(user, mpcode);
      if (isIntegrationSuccessful) {
        return res.status(200).json({ message: "Ahora eres vendedor!" });
      } else {
        return res.status(404).json({
          message: "El id del usuario no fue encontrado o no existe",
        });
      }
    }

    user.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

async function uploadAndResizeImage(storage, image, path, width, height) {
  const imageBuffer = fs.readFileSync(image.tempFilePath);
  const resizedImageBuffer = await sharp(imageBuffer)
    .resize({ width, height })
    .webp({ quality: 80 })
    .toBuffer();

  const imageStorageRef = ref(storage, path);
  const imageMetadata = {
    contentType: image.mimetype,
  };

  const imageSnapshot = await uploadBytesResumable(
    imageStorageRef,
    resizedImageBuffer,
    imageMetadata
  );
  return getDownloadURL(imageSnapshot.ref);
}

function passwordHasher(password) {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

function validateUserExistence(user, res) {
  if (!user) {
    return res
      .status(400)
      .json({ message: "El usuario que quieres actualizar no existe" });
  }
}

function validateEmailMatch(email1, email2, res) {
  if (email1 !== email2) {
    return res
      .status(400)
      .json({ message: "No puedes actualizar otro usuario!" });
  }
}

function validateRoleValues(roleValues, res) {
  const { seller, admin, soft } = roleValues;
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
}

function validatePasswordChange(
  oldPassword,
  newPassword,
  passwordIsValid,
  res
) {
  if (oldPassword && newPassword && !passwordIsValid) {
    return res.status(400).json({
      message: "La contraseña no coincide con tu contraseña actual",
    });
  } else if (oldPassword && newPassword && oldPassword === newPassword) {
    return res
      .status(400)
      .json({ message: "La nueva contraseña debe ser distinta a la actual" });
  }
}

async function integrateAsSeller(userId, code) {
  try {
    const body = {
      client_id: 8125390419773749,
      client_secret: "QkAwOW6BAQthSH0pOzOmoc9aPumLLKRi",
      code: code,
      grant_type: "authorization_code",
      redirect_uri: "https://pf-beat-connect.vercel.app/",
    };

    const response = await axios.post(
      `https://api.mercadopago.com/oauth/token`,
      body
    );

    if (response.data && response.data.access_token) {
      userId.accessToken = response.data.access_token;
      userId.isSeller = true;
      await userId.save();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
