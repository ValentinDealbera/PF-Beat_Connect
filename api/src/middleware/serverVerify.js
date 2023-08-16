//importar dot env
require("dotenv").config();
//traer TOKEN_ADMIN
const { SERVER_TOKEN } = process.env;

const authMiddleware = async (req, res, next) => {
  const serverToken = req.headers.serverToken;

  if (!serverToken) {
    return res.status(401).json({
      error: "Falta token de autenticación",
      receivedToken: null,
      expectedToken: null,
    });
  }

  if (serverToken !== SERVER_TOKEN) {
    return res.status(401).json({ error: "Token inválido" });
  }

  next();
};

module.exports = authMiddleware;
