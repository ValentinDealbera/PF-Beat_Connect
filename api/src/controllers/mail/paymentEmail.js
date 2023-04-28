require("dotenv").config();
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

module.exports = async (req, res) => {
  try {
    const { email, username, beatName } = req.body;
    await transporter.sendMail({
      from: "Equipo Beat-Connect <beatconnectteam@gmail.com>",
      to: email,
      subject: "¡Tu pago ha sido registrado!",
      html: `<p>Estimado/a ${username},</p>
              <p>¡Nos complace informarte que tu compra del beat "${beatName}" ha sido registrado! Ahora puedes disfrutar de tu nuevo beat y comenzar a trabajar en tu próxima gran canción.</p>
        <p>En Beat-Connect, confiamos en que con tu talento y nuestras herramientas de alta calidad, podrás crear un producto musical grandioso que te permitirá destacarte en la industria. ¡Estamos emocionados de ser parte de tu carrera musical!</p>
        <p>Si tienes alguna pregunta o necesitas ayuda con cualquier cosa, no dudes en contactarnos. Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana para ayudarte en todo lo que necesites.</p>
        <p>Una vez más, gracias por elegir Beat-Connect como tu plataforma para comprar y vender instrumentales. ¡Esperamos escuchar tu nueva canción pronto!</p>
        <p>¡Saludos cordiales!</p>
        <p>El equipo de Beat-Connect</p>`,
    });
    res.status(200).json({ message: "Email enviado con exito!" });
    transporter.close();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
