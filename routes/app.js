const express = require('express');
const router = express.Router();
const appController = require('../controllers/appController');

router.get('/', appController.index);

router.get('/post/:id', appController.showPost);

module.exports = router;