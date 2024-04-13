const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Altere aqui
const flash = require('connect-flash');
const passport = require('passport');
require('./middlewares/auth')(passport);
require('dotenv').config();
const db = require('./config/db');
const routes =require('./routes');
const path = require("path");
const isEqualHelper = require('./helpers/isEqual');
const dateFormatter = require('./helpers/dateFormatter');
const markdown = require('helper-markdown');

const app = express();

//config
//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ // Criando uma instância de MongoStore sem a função connectMongo
    mongoUrl: db.mongo_uri // Defina aqui a sua URL do MongoDB
  })
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(flash());

//Middleware
app.use(async (req, res, next) => {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})


//BodyParse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Handlebars
const hbs = handlebars.create({
  defaultLayout: 'main',
  helpers: {
    isEqual: isEqualHelper,
    dateFormatter: dateFormatter,
    markdown: markdown
  }
})
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(db.mongo_uri)
.then(() =>{
  console.log("Conectado ao MongoDB...");
})
.catch((err)=>{
  console.log("Erro ao se conectar com o banco de dados: " + err);
})

//public
app.use(express.static(path.join(__dirname, "public")));


//rotas
app.use('/', routes);

//outros
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3000 sob a url http://localhost:3000");
});