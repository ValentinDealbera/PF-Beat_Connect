const express = require("express");
const router = express();
const mercadopago = require("mercadopago");
const mpController = require("../controllers/mercadopagoController");

/* ----------- Controllers ----------- */

const getCart = require("../controllers/cart/getCart");
const postCart = require("../controllers/cart/postCart");
const deleteBeatInCartById = require("../controllers/cart/deleteBeatInCartById");
const getMpUrl = require("../controllers/cart/getMpUrl");

// mercadopago.configure({
//   access_token:
//     "APP_USR-1699631977193078-041813-f4098f3c98b9569762d5d6ff0f84f1cf-630209617",
// });

/* ----------- GET ----------- */

router.get("/", getCart);

/* ----------- POST ----------- */

router.post("/", postCart);

/* ----------- DELETE ----------- */

router.delete("/:cartId/beat/:beatId", deleteBeatInCartById);

/* ----------- INTEGRACION CON MERCADO PAGO ----------- */

router.post("/pay", mpController);

router.get("/toseller", getMpUrl);

module.exports = router;
