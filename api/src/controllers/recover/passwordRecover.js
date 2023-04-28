const UserModel = require("../../models/nosql/user");
const axios = require("axios");

module.exports = async (req, res) => {
  const { email } = req.body;

  if (!email)
    return res.status(400).json({ message: "Debes ingresar un Email valido" });

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "El usuario no fue encontrado" });
    }
    if (user.googleId.length > 1) {
      return res
        .status(404)
        .json({
          message:
            "Tu cuenta fue creada con Google, pruebe a iniciar sesion con Google",
        });
    }
    axios.post(BACKEND_URL + "api/mail/password", { email: email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
