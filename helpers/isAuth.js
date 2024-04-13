module.exports = {
  isAuth: (req, res, next) => {
    if(req.isAuthenticated()){
      return next();
    }else{
      req.flash("error_message", "Você deve estar logado para entrar aqui");
      res.redirect("/");
    }
  }
}