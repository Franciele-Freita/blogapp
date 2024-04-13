const mongoose = require('mongoose');
require('../models/Categoria');
const Categories = mongoose.model("categories")


exports.index = (req, res) => {
  res.render('admin');
}

exports.categories = (req, res) => {
  
  Categories.find()
  .then((categories) => {
    const categoriesData = categories.map(category => category.toJSON());
    res.render('admin/categories', {categories: categoriesData});
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao listar as categorias, tente novamente");
  });
  
}

exports.newCategory = (req, res) => {
  res.render('admin/category-create');
}

exports.showCategory = (req, res) => {
  Categories.findOne({_id: req.params.id})
  .then((category) => {
    const categoryData = category.toJSON();
    console.log(req.params.id);
    console.log(category);

    res.render('admin/category-update', {category: categoryData});
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao buscar a categoria, tente novamente");
      res.redirect("/admin/categorias");
  })
}

exports.updateCategory = (req, res) => {

  let errors = [];
  if(!req.body._id || typeof req.body._id == undefined || req.body._id == null){
    errors.push({
      message: "Algo deu errado, tente novamente!"
    })
  }

  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    errors.push({
      message: "O campo nome é obrigatório!"
    })
  }

  if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
    errors.push({
      message: "O descrição nome é obrigatório!"
    })
  }

  Categories.findOne({
    _id: req.body.id
  })
  .then((category) => {
    category.name = req.body.name,
    category.description = req.body.description,

    category.save()
    .then(() => {
      req.flash("success_message", "Categoria editada com sucesso");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash("error_message", "Houve um erro ao salvar a categoria, tente novamente");
      res.redirect("/admin/categorias");
    });
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao tentar buscar a categoria, tente novamente");
    res.redirect("/admin/categorias");
  })
}

exports.categorySave = (req, res) => {

  let errors = [];
  
  if(!req.body.name || typeof req.body.name == undefined || req.body.name == null){
    errors.push({
      message: "O campo nome é obrigatório!"
    })
  }

  if(!req.body.description || typeof req.body.description == undefined || req.body.description == null){
    errors.push({
      message: "O descrição nome é obrigatório!"
    })
  }
    
  if(errors.length > 0){
    res.render("admin/category-create", {errors: errors})
  }else{
    const newCategory = {
      name: req.body.name,
      description: req.body.description,
    }

    new Categories(newCategory)
    .save()
    .then(() => {
      req.flash("success_message", "Categoria cadastrada com sucesso");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash("error_message", "Houve um erro ao salvar a categoria, tente novamente");
      res.redirect("/admin/categorias");
    });
  }  
}

exports.deleteCategory = (req, res) => {
  Categories.findOne({
    _id: req.body.id
  })
  .then((category) => {
    category.delete()
    .then(() => {
      req.flash("success_message", "Categoria excluida com sucesso");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash("error_message", "Houve um erro ao deletar a categoria, tente novamente");
      res.redirect("/admin/categorias");
    })
  })
  .catch((err) => {
    req.flash("error_message", "Houve um erro ao tentar buscar a categoria, tente novamente");
      res.redirect("/admin/categorias");
  })
}

