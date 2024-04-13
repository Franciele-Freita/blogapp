const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/User");
const User = mongoose.model("users");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              console.log(user);
              return done(null, false, { message: "Esta conta não existe" });
            } else {
              bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                  return done(null, user);
                } else {
                  return done(null, false, { message: "Senha incorreta" });
                }
              });
            }
          })
          .catch((err) => {
            console.log('Erro no passport', err);
            return done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

};
