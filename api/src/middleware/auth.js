const jwt = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader);
    if (!authHeader) {
        return res.status(401).json({ error: 'Falta token de autenticación', receivedToken: null, expectedToken: null });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Falta token de autenticación', receivedToken: null, expectedToken: null });
    }

    try {
        const { id } = await jwt.verifyToken(token);
        console.log("id:", id);
        console.log("req.params.userId:", req.params.userId);
        if ({id}) {
            req.user = { id };
            next();
        } else {
            res.status(403).json({ error: 'Acceso no autorizado' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }

};

module.exports = authMiddleware;