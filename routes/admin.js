const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");
const postController = require("../controllers/postController");
const { isAdmin } = require('../helpers/isAdmin');

const { isAuth } = require('../helpers/isAuth');
router.get('/', isAdmin, adminController.index);

router.get('/categorias', isAdmin, adminController.categories);

router.get('/categoria/adicionar', isAdmin, adminController.newCategory);

router.get('/categoria/editar/:id', isAdmin, adminController.showCategory);

router.post('/categoria/editar', isAdmin, adminController.updateCategory);

router.post('/categoria/delete', isAdmin, adminController.deleteCategory);

router.post('/categoria/adicionar', isAdmin, adminController.categorySave);


router.get('/posts', isAdmin, postController.index);

router.get('/post/adicionar', isAdmin, postController.createPost);

router.post('/post/adicionar', isAdmin, postController.savePost);

router.get('/post/editar/:id', isAdmin, postController.showPost);

router.post('/post/editar', isAdmin, postController.updatePost);

router.post('/post/delete', isAdmin, postController.deletePost);


module.exports = router;