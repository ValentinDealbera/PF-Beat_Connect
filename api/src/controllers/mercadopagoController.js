require("dotenv").config();
const { PROD_ACCESS_TOKEN, TEST_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
const Beats = require("../models/nosql/beats");
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

mercadopago.configure({
  access_token:
    "TEST-6311174056037890-041912-353e6d3cf9f12b63e5f8c5e9785a00d6-1356139611",
});

module.exports = async (req, res) => {
  const { cart } = req.body;

  try {
    const beatsToCheckout = await Beats.find({ _id: { $in: cart } });
    let preference = {
      items: beatsToCheckout.map((beat) => ({
        title: beat.name,
        unit_price: beat.priceAmount,
        quantity: 1,
      })),
      marketplace_fee: 5,
      back_urls: {
        success: "http://localhost:3001/api/feedback",
        failure: "http://localhost:3001/api/feedback",
        pending: "http://localhost:3001/api/feedback", // 3001 es el backend
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    const mpLink = response.body.init_point;

    res.status(OK).json(mpLink);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};
