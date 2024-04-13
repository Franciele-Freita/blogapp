const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: 0,
  },
  role:{
    type: String,
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

mongoose.model("users", User);