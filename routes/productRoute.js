const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const ProductController = require('../controllers/productControllers');

router.get( '/', ( req, res, next ) => ProductController.show );

router.get( '/:name', ( req, res, next ) => ProductController.getByName );

router.get( '/:id', ( req, res, next ) => ProductController.getById );

router.post( '/', ( req, res, next ) => ProductController.createProduct );

router.put( '/:id', ( req, res, next ) => ProductController.updateById );

router.delete( '/:id', ( req, res, next ) => ProductController.deleteById );

module.exports = router;