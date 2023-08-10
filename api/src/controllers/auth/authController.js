const axios = require("axios");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/nosql/user");
const jwt = require("../../utils/jwt");
//TRAEMOS ENV
require("dotenv").config();
const { BACKEND_URL } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }
  //pasamos el email a minusculas
  let emailCase = email.toLowerCase();
  try {
    // Buscar al usuario por su email
    const user = await userModel.findOne({ email: emailCase });

    // Si el usuario no existe, devolver un error
    if (!user) {
      return res.status(401).json({ message: "Email inválido" });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const passwordIsValid = await bcrypt.compare(
      password.trim(),
      user.password.trim(),
    );

    // Si la contraseña no coincide, devolver un error
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    // Generar un token JWT y enviarlo como respuesta
    const token = jwt.generateToken({ id: user.id, email: user.email });
    res.json({ token: token, user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
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

module.exports = { login, register };
