const express = require("express");
const { Router } = require("express");
require('dotenv').config();
const router = Router();
const passport = require("passport")
require("../middleware/passport")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { DB_URI, } = process.env

const store = new MongoDBStore({
  uri: DB_URI,
  collection: 'sessions'
});


router.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  store: store
}));

router.use(passport.initialize());
router.use(passport.session());

function isLoggedIn(req, res, next) {
  console.log("user:", req.user);
  if (req.user) {
    const expires = new Date(Date.now() + req.session.cookie.maxAge);
    console.log("expires:", expires);
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized', session: req.session });
  }
}

router.get('/', (req, res) => {
  //res.send('<a href="/api/google/auth/google">Authenticate with Google</a>');
  res.redirect('/api/google/auth/google');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    //successRedirect: `http://localhost:3000/?id=${session}`,
    successRedirect: '/api/google/protected',
    failureRedirect: '/api/google/auth/google/failure'
  })
);

router.get('/protected', isLoggedIn, (req, res) => {

  const id = req.user._id.toString();
  console.log(id);
  console.log("session:", req.sessionID)
  //res.send('You are logged in');
  //return res.json({message: 'You are logged in', id: id});
  res.redirect(`http://localhost:3000/?id=${id}&session=${req.sessionID}`);
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al cerrar sesión');
    }
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.send('¡Goodbye!');
  });

});

router.get("/verify", async (req, res) => {
  //devolvemos la cookie de sesión
  const { session } = req.headers;
  console.log("sessionID:", session);
  const mongoSession = await store.db.collection("sessions").findOne({ _id: session });

  console.log("mongoSession:", mongoSession);
  //console.log("store", store.all);
  if (mongoSession) {
    res.status(200).json({ message: "Sesión válida", session: mongoSession });
  } else {
    res.status(401).json({ message: "Sesión inválida" });
  }

});


router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


module.exports = router;
