const User = require("../models/nosql/user")
const passport = require ("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config();
const { BACKEND_URL } = process.env;

passport.use(
    new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${BACKEND_URL}api/google/auth/google/callback`
},
async function(accessToken, refreshToken, profile, done) {
    console.log("Trying to access google acount", profile);
    try{
        let user = await User.findOne({googleId: profile.id})
        if(user){
            return done(null, user)
        }else{
          //separar el nombre y el apellido en dos campos
          const name = profile.displayName.split(" ");
          const firstName = name[0];
          const lastName = name[1];
          //nombre + id
          const username = firstName + profile.id;
            const newUser=
            {
                googleId: profile.id, 
              //  name: profile.displayName,
                firstName: firstName,
                lastName: lastName,
                username: username,
                image: profile.photos[0].value,
                email: profile.emails[0].value
            }
            user = await User.create(newUser)
            console.log("creating new user");
            return done(null, user)
        }
    }catch(err){
        console.error(err)
        
    }
}
));


passport.serializeUser(async function (user, done) {
    try {
      // Guardar el googleId del usuario en la sesión del usuario
      // Puedes utilizar cualquier campo único del usuario para identificar la sesión en la base de datos
      // En este caso, se utiliza el googleId del usuario
     
      done(null, user.googleId);
    } catch (err) {
      done(err);
    }
  });

passport.deserializeUser(async function(googleId, done) {
    try {
      const user = await User.findOne({ googleId: googleId });
      if (user) {
        done(null, user);
      } else {
        done(null, null); // o done(false)
      }
    } catch (err) {
      done(err);
    }
  });
