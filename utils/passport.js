require('dotenv').config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const JWTExtractor = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
    jwtFromRequest: JWTExtractor.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}, (payload, done) => {
    done(null, payload);
}));

module.exports = passport;