require("dotenv").config();
const { PROD_ACCESS_TOKEN, TEST_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");
const Beats = require("../models/nosql/beats");
const userModel = require("../models/nosql/user");
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


module.exports = async (req, res) => {
  console.log(req.body);
  const { cart, buyer } = req.body;
  mercadopago.configure({
    access_token:
      req.body.access_token,
  });

  const beatPercentage = (beatArr, n) => {
    let aux = 0
    beatArr.forEach(e=>{
      aux = aux + ((e.priceAmount * n) / 100)
    })
    console.log(aux);
    return aux
  }

  try {
    const userBuyer = await userModel.findOne({id:buyer})
    const beatsToCheckout = await Beats.find({ _id: { $in: cart } });
    let preference = {
      items: beatsToCheckout.map((beat) => {
        return {
        title: beat.name,
        unit_price: beat.priceAmount,
        quantity: 1,
      }}),
      // items: [{
      //   title: 'asd',
      //   unit_price: 5,
      //   quantity: 1,
      // }],
      marketplace_fee: beatPercentage(beatsToCheckout, 15),
      back_urls: {
        success: "http://localhost:3001/api/feedback",
        failure: "http://localhost:3001/api/feedback",
        pending: "http://localhost:3001/api/feedback", // 3001 es el backend
      },
      payer: {
        name: userBuyer.firstName,
        surname: userBuyer.lastName,
        email: userBuyer.email,
        },
    };

    const response = await mercadopago.preferences.create(preference);
    const mpLink = response.body.init_point;

    res.status(OK).json(mpLink);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};
