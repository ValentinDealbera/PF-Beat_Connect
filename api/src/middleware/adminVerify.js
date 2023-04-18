//importar dot env
require('dotenv').config();
//traer TOKEN_ADMIN
const { TOKEN_ADMIN } = process.env;

const authMiddleware = async (req, res, next) => {

    const adminToken = req.headers.adminToken;

    if (!adminToken) {
        return res.status(401).json({ error: 'Falta token de autenticación', receivedToken: null, expectedToken: null });
    }

    if (adminToken !== TOKEN_ADMIN) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    next();

};

module.exports = authMiddleware;