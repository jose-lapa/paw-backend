const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const ProductController = require('../controllers/productControllers');

module.exports = router;