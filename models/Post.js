const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

mongoose.model('posts', Post)