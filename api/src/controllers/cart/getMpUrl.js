const { v4 } = require("uuid");

module.exports = (req, res) => {
  try {
    const uuid4 = v4();
    const url = `https://auth.mercadopago.com/authorization?client_id=8125390419773749&response_type=code&platform_id=mp&state=${uuid4}&redirect_uri=https://pf-beat-connect.vercel.app/`;
    res.status(200).json({ link: url });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};
