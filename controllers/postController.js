const mongoose = require('mongoose');
require('../models/Post');
const Categories = mongoose.model("categories")
const Posts = mongoose.model("posts")

exports.index = (req, res) => {
  Posts.find().populate('category')
  .then((posts) => {
    const postsData = posts.map(posts => posts.toJSON());
    
    res.render("admin/post", {posts: postsData});
    
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao listar as postagens, tente novamente");
    console.log(err);
    res.render("admin");
  })
}

exports.createPost = (req, res) => {
  Categories.find()
  .then((categories) => {
    console.log(categories);
    const categoriesData = categories.map(categories => categories.toJSON())
    res.render("admin/post/new", {categories: categoriesData});
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao listar as categorias, tente novamente");
    res.render("admin/posts");
  })
}

exports.savePost = (req, res) => {

  const errors = [];
  if(!req.body.title || typeof req.body.title == undefined || req.body.title == null){
    errors.push({
      message: "O  título é obrigatório!"
    })
  }
  if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
    errors.push({
      message: "O  descrição é obrigatório!"
    })
  }
  if(!req.body.content || typeof req.body.content == undefined || req.body.content == null){
    errors.push({
      message: "O conteúdo é obrigatório!"
    })
  }
  if(!req.body.category || typeof req.body.category == undefined || req.body.category == null){
    errors.push({
      message: "A categoria é obrigatória!"
    })
  }

  if(errors > 0){
    req.flash("error_message", "Erro interno");
      res.redirect("/admin/posts");
  }else{
    const request = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category,
      user: req.user.id,
    }
    console.log(request);
    new Posts(request)
    .save()
    .then(() => {
      req.flash("success_message", "Post cadastrado com sucesso");
      res.redirect("/admin/posts");
    })
    .catch((err) => {
      req.flash("error_message", "Houve um erro ao tentar salvar o post, tente novamente");
      res.redirect("/admin/posts");
    });
  }

}

exports.showPost = (req, res) => {
  Posts.findById(req.params.id).populate('category')
  .then((post) => {
    Categories.find()
    .then((categories) => {
      const postData = post.toJSON();
      const categoriesData = categories.map(categories => categories.toJSON())
      res.render("admin/post/update", {post: postData, categories: categoriesData});

      /* console.log(categoriesData); */
    })
    .catch((err) => {
      req.flash("error_message", "Erro interno");
      res.redirect("/admin/posts");
    })
    
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao tentar buscar o post, tente novamente");
      res.redirect("/admin/posts");
  })
}

exports.updatePost = (req, res) => {
  const errors = [];
  if(!req.body.title || typeof req.body.title == undefined || req.body.title == null){
    errors.push({
      message: "O  título é obrigatório!"
    })
  }
  if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
    errors.push({
      message: "O  descrição é obrigatório!"
    })
  }
  if(!req.body.content || typeof req.body.content == undefined || req.body.content == null){
    errors.push({
      message: "O conteúdo é obrigatório!"
    })
  }
  if(!req.body.category || typeof req.body.category == undefined || req.body.category == null){
    errors.push({
      message: "A categoria é obrigatória!"
    })
  }

  if(errors.length > 0){
    res.redirect('admin.posts', {errors: errors});
  }else{
    Posts.findById({_id: req.body.id})
    .then((post) => {
      console.log(req.body);
      post.title = req.body.title;
      post.description = req.body.description;
      post.content = req.body.content;
      post.category = req.body.category;
      post.save()
      .then(() => {
        req.flash("success_message", "Post editado com sucesso");
        res.redirect("/admin/posts");
      })
      .catch((err) => {
        req.flash("error_message", "Houve um erro tentar salvar o post, tente novamente");
    res.redirect("/admin/posts");
      })
    })
    .catch((err) => {
      req.flash("error_message", "Houve um erro ao buscar o post, tente novamente");
      res.redirect("/admin/categorias");
    })
  }
}

exports.deletePost = (req, res) => {
  Posts.findById({_id: req.body.id})
  .then((post) => {
    post.delete()
    .then(() => {
      req.flash("success_message", "Post escluido com sucesso");
      res.redirect("/admin/posts");
    })
    .catch((err) => {
      req.flash("error_message", "Tivemos um error ao tentar excluir o post, tente novamente");
      res.redirect("/admin/posts");
    })
  })
  .catch((err) => {
    req.flash("error_message", "Não foi possivel encontrar o post, tente novamente");
      res.redirect("/admin/posts");
  })
}