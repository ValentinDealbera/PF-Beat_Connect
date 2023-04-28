const { Router } = require("express");
require("dotenv").config();
const router = Router();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerEmail = require("../controllers/mail/registerEmail");
const paymentEmail = require("../controllers/mail/paymentEmail");
const passwordEmail = require("../controllers/mail/passwordEmail");

transporter
  .verify()
  .then(() => {
    console.log("***E-mail listo para enviar***");
  })
  .catch((error) => console.log(error.message));

router.post("/register", registerEmail);

router.post("/payment", paymentEmail);

router.post("/password", passwordEmail);

module.exports = router;
