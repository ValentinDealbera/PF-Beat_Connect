// const express = require("express");
// const router = express();
// const mongoose = require("mongoose");
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
  access_token: "TEST-05f893b5-e601-4913-8ea8-18bd7747da28",
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
      back_urls: {
        success: "http://localhost:3001/api/feedback",
        failure: "http://localhost:3001/api/feedback",
        pending: "http://localhost:3001/api/feedback", // 3001 es el backend
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    const mpLink = response.body.sandbox_init_point;

    res.status(OK).json(mpLink);
  } catch (error) {
    res.status(SERVER_ERROR).json({ error: error.message });
  }
};
