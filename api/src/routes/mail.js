const { Router } = require("express");
const router = Router();
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user:'beatconnectteam@gmail.com',
        pass:'pvhjvkoufkvxzyfb',
    }
})
transporter.verify().then(()=>{
    console.log('***E-mail listo para enviar***');
}).catch(error=>console.log(error.message))

router.post('/register', async (req,res)=>{
    try {
        const {email, userName} = req.body
        await transporter.sendMail({
            from: 'Equipo Beat-Connect <beatconnectteam@gmail.com>',
            to: email,
            subject: 'Gracias por registrarte!',
            html: `<p>Estimado/a ${userName},</p>
            <p>¡Bienvenido/a a la comunidad de Beat-Connect! Nos complace informarte que tu registro ha sido exitoso y que ahora eres parte de nuestra plataforma en línea de compra y venta de instrumentales para productores y artistas por igual.</p>
            <p>En Beat-Connect, nos enorgullece crear una comunidad que crece cada día más, y estamos emocionados de que hayas decidido unirte a nosotros en este emocionante viaje musical. Con nuestra plataforma, podrás encontrar una amplia selección de instrumentales de alta calidad y conectarte con otros miembros de la comunidad para mejorar tus habilidades y colaborar en proyectos.</p>
            <p>Queremos que te sientas como en casa en Beat-Connect, así que no dudes en explorar la plataforma y descubrir todas las características que ofrecemos. Estamos aquí para ayudarte en todo lo que necesites, y nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana para responder a tus preguntas y ayudarte a hacer crecer tu carrera musical.</p>
            <p>Una vez más, gracias por elegir Beat-Connect como tu plataforma de compra y venta de instrumentales. Estamos emocionados de tenerte a bordo y esperamos ver todo lo que puedes lograr con nosotros.</p>
            <p>¡Saludos cordiales!</p>
            <p>El equipo de Beat-Connect</p>`
        })
        res.status(200).json({message: 'Email enviado con exito!'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/payment', async (req,res)=>{
    try {
        const {email, userName, beatName} = req.body
        await transporter.sendMail({
            from: 'Equipo Beat-Connect <beatconnectteam@gmail.com>',
            to: email,
            subject: '¡Tu pago ha sido registrado!',
            html: `<p>Estimado/a ${userName},</p>
            <p>¡Nos complace informarte que tu compra del beat "${beatName}" ha sido registrado! Ahora puedes disfrutar de tu nuevo beat y comenzar a trabajar en tu próxima gran canción.</p>
      <p>En Beat-Connect, confiamos en que con tu talento y nuestras herramientas de alta calidad, podrás crear un producto musical grandioso que te permitirá destacarte en la industria. ¡Estamos emocionados de ser parte de tu carrera musical!</p>
      <p>Si tienes alguna pregunta o necesitas ayuda con cualquier cosa, no dudes en contactarnos. Nuestro equipo de soporte está disponible las 24 horas del día, los 7 días de la semana para ayudarte en todo lo que necesites.</p>
      <p>Una vez más, gracias por elegir Beat-Connect como tu plataforma para comprar y vender instrumentales. ¡Esperamos escuchar tu nueva canción pronto!</p>
      <p>¡Saludos cordiales!</p>
      <p>El equipo de Beat-Connect</p>`
        })
        res.status(200).json({message: 'Email enviado con exito!'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;
