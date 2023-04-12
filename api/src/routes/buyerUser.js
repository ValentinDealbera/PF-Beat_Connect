const express = require("express");
const router = express();
const mongoose = require("mongoose");
const { BuyerUserModel } = require("../Schemas/index");
const {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  USER_NOT_FOUND,
  SERVER_ERROR,
} = require("../controllers/status");
const {
  getAllBuyerModel,
  getBuyerId,
} = require("../controllers/buyerUController");

router.get("/", async (req, res) => {
  try {
    const users = await getAllBuyerModel();
    res.json(users);
  } catch (err) {
    res.status(SERVER_ERROR).send(USER_NOT_FOUND);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allBuyerId = await getBuyerId(id);
    allBuyerId
      ? res.status(OK).send(allBuyerId)
      : res.status(NOT_FOUND).send(USER_NOT_FOUND);
  } catch (err) {
    res.status(NOT_FOUND).send(USER_NOT_FOUND);
  }
});

router.post("/", async (req, res) => {
  const { body } = req;

  try {
    const user = await BuyerUserModel.create(body);
    res.send(user);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
