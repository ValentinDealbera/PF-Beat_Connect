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
    maxAge: 24 * 60 * 60 * 1000 
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
    res.sendStatus(401);
  }
}

router.get('/', (req, res) => {
  res.send('<a href="/api/google/auth/google">Authenticate with Google</a>');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/api/google/protected',
    failureRedirect: '/api/google/auth/google/failure'
  })
);

router.get('/protected', isLoggedIn, (req, res) => {
  console.log(session);
  res.send(`Hello`);
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


router.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


module.exports = router;
