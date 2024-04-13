const express = require('express');
const router = express.Router();

const appRoute = require('./app');
const adminRoute = require('./admin');
const authRoute = require('./auth');

router.use('/', appRoute);
router.use('/admin', adminRoute);
router.use('/auth', authRoute);

module.exports = router;