const express = require("express");
const router = express();

const getOrders = require("../controllers/orders/getOrders");
const getSellerById = require("../controllers/orders/getSellerById");
const getBuyerById = require("../controllers/orders/getBuyerById");
const postOrder = require("../controllers/orders/postOrder");
const deleteOrderById = require("../controllers/orders/deleteOrderById");

router.get("/", getOrders);

router.get("/seller/:userSellerId", getSellerById);

router.get("/buyer/:userBuyerId", getBuyerById);

router.post("/", postOrder);

router.delete("/:id", deleteOrderById);

module.exports = router;
