const express = require("express");
const router = express();
const mongoose = require("mongoose");
const Cart = require("../models/nosql/cart");
const Beats = require("../models/nosql/beats");
const User = require("../models/nosql/user");
const mercadopago = require("mercadopago");
const {v4} = require('uuid')
const mpController = require("../controllers/mercadopagoController");
const { PROD_ACCESS_TOKEN } = process.env;

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

// mercadopago.configure({
//   access_token:
//     "APP_USR-1699631977193078-041813-f4098f3c98b9569762d5d6ff0f84f1cf-630209617",
// });

router.get("/", async (req, res) => {
  const productCart = await Cart.find();
  if (productCart) {
    res.json({ productCart });
  } else {
    res.json({ message: "no products in cart" });
  }
});

router.post("/", async (req, res) => {
  const { beatId, userId } = req.body;
  try {
    const beat = await Beats.findById(beatId);
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId });

    if (!beat) {
      return res.status(400).json({ message: "Beat not found" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!cart) {
      // create a new cart if it does not exist
      const newCart = new Cart({
        user: userId,
        beats: [{ beat: beatId, quantity: 1 }],
        totalAmount: beat.priceAmount,
      });

      await newCart.save();

      beat.inCart = true;
      await beat.save();

      return res.json({ message: "Beat added to cart", cart: newCart });
    }

    // check if the beat is already in the cart
    const beatInCartIndex = cart.beats.findIndex(
      (item) => item.beat.toString() === beatId
    );

    if (beatInCartIndex === -1) {
      // add a new beat to the cart
      cart.beats.push({ beat: beatId, quantity: 1 });
      cart.totalAmount += beat.priceAmount;

      await cart.save();

      beat.inCart = true;
      await beat.save();

      return res.json({ message: "Beat added to cart", cart });
    } else {
      return res.status(400).json({ message: "Beat already in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:cartId/beat/:beatId", async (req, res) => {
  try {
    const { cartId, beatId } = req.params;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ mensaje: "El carrito no existe" });
    }

    // Eliminar el beat en específico del carrito
    const beatToDelete = cart.beats.find(
      (beat) => beat._id.toString() === beatId
    );
    if (!beatToDelete) {
      return res
        .status(404)
        .json({ mensaje: "El beat no existe en este carrito" });
    }
    const updatedBeats = cart.beats.filter(
      (beat) => beat._id.toString() !== beatId
    );
    cart.beats = updatedBeats;
    await cart.save();

    // Actualizar el estado del beat eliminado
    await Beats.findByIdAndUpdate(beatId, { inCart: false });

    // Eliminar el carrito si ya no tiene beats
    if (cart.beats.length === 0) {
      await Cart.findByIdAndDelete(cartId);
      return res.json({
        mensaje: "El carrito y el beat fueron eliminados exitosamente",
      });
    }

    res.json({
      mensaje: `El beat ${beatToDelete.beat.name} fue eliminado del carrito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error" });
  }
});

/******************     INTEGRACION CON MERCADO PAGO   ********************** */

router.post("/pay", mpController);
router.get("/toseller", (req, res)=>{
  try {
    const uuid4 = v4()
    const url = `https://auth.mercadopago.com/authorization?client_id=8125390419773749&response_type=code&platform_id=mp&state=${uuid4}&redirect_uri=https://pf-beat-connect.vercel.app/`
    res.status(200).json({link:url})
  } catch (error) {
    res.status(200).json({message:error.message})
  }
});

module.exports = router;
