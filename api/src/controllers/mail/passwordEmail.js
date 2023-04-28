const userModel = require("../../models/nosql/user");
require("dotenv").config();
const FRONTEND_URL = process.env.FRONTEND_URL;
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
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    const userName = user.username;
    await transporter.sendMail({
      from: "Equipo Beat-Connect <beatconnectteam@gmail.com>",
      to: email,
      subject: "¡Tu solicitud de cambio de contraseña ha sido recibida!",
      html: `<p>Estimado/a ${userName},</p>
              <p>En nombre de todo el equipo de Beat Connect, te informamos que hemos recibido tu solicitud para cambiar la contraseña de tu cuenta en nuestra plataforma. Sabemos lo importante que es proteger tu información personal y nos complace ayudarte en este proceso.</p>
        <p>Para continuar con el cambio de contraseña, por favor sigue el enlace que se encuentra a continuación y sigue las instrucciones en pantalla. Si no has solicitado este cambio, por favor ignora este mensaje.</p>
        <a href=${
          FRONTEND_URL + "auth/password" + "?email=" + email
        } > ¡Haz click aqui! </a>
        <p>Si tienes alguna duda o necesitas ayuda con cualquier cosa, no dudes en contactarnos. Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana para ayudarte en todo lo que necesites.</p>
        <p>Recuerda que en Beat Connect trabajamos constantemente para brindarte la mejor experiencia posible en nuestra plataforma y esperamos que pronto puedas disfrutar de todos nuestros servicios nuevamente.</p>
        <p>¡Gracias por confiar en nosotros!</p>
        <p>El equipo de Beat Connect.</p>`,
    });
    res.status(200).json({ message: "Email enviado con exito!" });
    transporter.close();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
