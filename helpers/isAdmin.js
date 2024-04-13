module.exports = {
  isAdmin: function(req, res, next) {
    if(req.isAuthenticated() && req.user && req.user.isAdmin === true){
      return next();
    }else{
      req.flash("error_message", "Você Precisa ser um Administrador!");
      res.redirect("/");
    }
  }
}