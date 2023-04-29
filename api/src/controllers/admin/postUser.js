const axios = require("axios");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/nosql/user");
const jwt = require("../../utils/jwt");
const sharp = require("sharp");
module.exports = async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;

  if (!email || !password || !firstName || !lastName || !username) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }
  let emailCase = email.toLowerCase();
  try {
    // Verificar si el usuario ya existe
    const existingUser = await userModel.findOne({ email: emailCase });
    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    // Cifrar la contraseña
    const saltRounds = 10; // Cambia esto a tu preferencia
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Crear un nuevo usuario
    console.log(emailCase, password, firstName, lastName, username);
    const userOK = await userModel.create({
      email: emailCase,
      password: hashedPassword,
      firstName,
      lastName,
      username,
    });

    // Generar un token JWT y enviarlo como respuesta
    const token = jwt.generateToken({ id: userOK.id, email: userOK.email });
    res.json({ token, userOK });
    axios.post(`${BACKEND_URL}api/mail/register`, { email, username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
