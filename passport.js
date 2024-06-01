express = require("express");
const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("./models");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3030/api/v1/users/auth/google/callback",
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({
          where: { authGgId: profile.id, authType: "google" },
        });

        if (user) {
          return done(null, user);
        }
        user = await User.create({
          authType: "google",
          email: profile.emails[0].value,
          authGgId: profile.id,
          name: profile.displayName,
        });
        console.log(user);
        await user.save();

        done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
