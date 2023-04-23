// const passport = require("passport")
// require("../middleware/passport")
// const { DB_URI, } = process.env
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const { Router } = require("express");
// const router = Router();

// const store = new MongoDBStore({
//     uri: DB_URI, 
//     collection: 'sessions' 
//   });
  
// router.use(session({
//     secret: 'mySecretKey',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000 
//     },
//     store: store 
//   }));
  
  
// router.use(passport.initialize());
// router.use(passport.session());

// function isLoggedIn(req, res, next) {
//     console.log("user:", req.user);
//     if (req.user) {
//       const expires = new Date(Date.now() + req.session.cookie.maxAge); 
//       console.log("expires:", expires); 
//       next();
//     } else {
//       res.sendStatus(401);
//     }
//   }

//   module.exports= isLoggedIn