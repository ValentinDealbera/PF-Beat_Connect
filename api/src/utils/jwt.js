const jwt = require('jsonwebtoken');
//const secret = process.env.JWT_SECRET;
const secret = 'mysecret';
const generateToken = (payload) => {
    const options = {
        expiresIn: '1d',
    };
    return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret, { ignoreExpiration: false });
        const { id } = decoded;
        return { id };
    } catch (err) {
        return null;
    }
};



module.exports = { generateToken, verifyToken };