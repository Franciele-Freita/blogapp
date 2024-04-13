const mongoose = require('mongoose');
require('../models/User');
const Users = mongoose.model("users");
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.showRegister = (req, res) => {
  res.render('auth/signUp');
}

exports.register = (req, res) => {
  let errors = [];
  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    errors.push({
      message: "O nome é obrigatório"
    })
  }
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    errors.push({
      message: "O email é obrigatório"
    })
  }
  if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
    errors.push({
      message: "A senha é obrigatória"
    })
  }
  if(req.body.password != req.body.confirm_password){
    errors.push({
      message: "As senhas precisam ser iguais, tente novamente"
    })
  }

  if(errors.length > 0){
    res.render('auth/signUp', {errors: errors});
  }else{
    Users.findOne({email: req.body.email})
    .then((user) => {
      if(user){
        req.flash("error_message", "Já existe uma conta com e-mail em nosso sistema!")
        res.redirect("/auth/register");
      }{
        const newUser = new Users({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          
        })
        /* const newUser = new Users(
          {
          name: "Guilherme",
          email: "guiguiugames@gmail.com",
          password: 'maranata22',
          role: 'Escritor',
          isAdmin: 1,
          },
          ) */

        console.log(newUser);

        bcrypt.genSalt(10, (erro, salt) =>{
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){
              console.log(err);
              req.flash("error_message", "Houve algum erro" + err);
              res.redirect('/auth/register');
            }else{
              newUser.password = hash;

              newUser.save()
              .then(() => {
                req.flash("success_message", "Conta registrada com sucesso");
                res.redirect("/auth/register");
              })
              .catch((err) => {
                req.flash("error_message", "Não fi possivel criar esta conta, tente novamente mais tarde!");
                res.redirect("/auth/register");
              })
            }
          })
        })
      }
    })
    .catch((err) => {
      req.flash("error_message", "Erro interno")
      res.redirect("/auth/register");
    })
 }
}

exports.showLogin = (req, res) => {
  res.render('auth/signIn');
}

exports.login = (req, res, next) => {
  let errors = [];
  if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
    errors.push({
      message: "O email é obrigatório"
    })
  }
  if(!req.body.password || typeof req.body.password == undefined || req.body.password == null){
    errors.push({
      message: "A senha é obrigatória"
    })
  }

  if(errors.length > 0){
    res.render('auth/signIn', {errors: errors});
  }else{
    
    passport.authenticate("local", {
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
    })(req, res, next);
  }
}

exports.logOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle error, if any
      console.error(err);
    }
    // Redirect after logout
    res.redirect("/");
  });
}