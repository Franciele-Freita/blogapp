const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true
  }
});

mongoose.model("categories", Categoria);