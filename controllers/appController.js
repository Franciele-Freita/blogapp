const mongoose = require('mongoose');
require('../models/Post');
const Posts = mongoose.model("posts")
require('../models/Categoria');
const Categories = mongoose.model("categories")
require('../models/User');
const Users = mongoose.model("users")

exports.index = (req, res) => {
  Posts.find().populate(['category', 'user']).sort({_id: 'desc'})
  .then((posts) => {
    
    Categories.find()
    .then((categories) => {
      Users.find({isAdmin: true, role: "Escritor"})
      .then((users) => {
        const postsData = posts.map(posts => posts.toJSON());
        const categoriesData = categories.map(categories => categories.toJSON());
        const usersData = users.map(users => users.toJSON());

        res.render("welcome", {posts: postsData, categories: categoriesData, users: usersData});
      })
      .catch((err) => {
        res.send("Error: 404/" + err)
      })
      

    })
    .catch((err) => {
      res.send("Error: 404/" + err)
    })


    
  })
  .catch((err) => {
    res.send("Error: 404/" + err)
  })
}

exports.showPost = (req, res) => {
  Posts.findById({_id: req.params.id}).populate("category")
  .then((post) => {
    const postData = post.toJSON();
    res.render('showPost', {post: postData});
  })
  .catch((err) => {
    req.flash('error_message', "Houve algum erro ao tentar abrir o post");
    res.redirect('welcome');

  })
}