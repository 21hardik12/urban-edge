const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Strategy , ExtractJwt } = require('passport-jwt');
const JwtStrategy = Strategy;
require('dotenv').config();

passport.use(
  "local-signup", 
  new LocalStrategy(
    {
      usernameField: 'email', 
      passwordField: 'password',       
    },
    async (email, password, done) => {
      try {
        const userExists = await User.findOne({email});
        if (userExists) {
          return done(null, false, { message: "Email already used"});
        }

        const user = new User({email, password});
        await user.save();
        

        return done(null, user, { message: "User successfully registered"});
      } catch(error) {
        done(error);
      }
    }
  )
);

passport.use("local-login", new LocalStrategy(
  {
    usernameField: 'email', 
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({email});
      if (!user) return done(null, false, {message: 'Incorrect email or password'});
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return done(null, false, {message: 'Incorrect email or password'})
      
      return done(null, user);
    } catch (error) {
      console.log(error);
      done(error);
    }
}));

passport.use('jwt',
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      // Fetch the user from the database using the ID from the JWT payload
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
));


module.exports = passport;