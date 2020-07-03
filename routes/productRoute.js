const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productControllers');

router.get( '/', ( req, res ) => ProductController.show );

router.get( '/name/:name', ( req, res ) => ProductController.getByName );

router.get( '/:id', ( req, res ) => ProductController.getById );

router.get( '/seller/:id', ( req, res ) => ProductController.getBySeller );

router.post( '/', ( req, res ) => ProductController.create );

router.put( '/:id', ( req, res ) => ProductController.updateById );

router.delete( '/:id', ( req, res ) => ProductController.deleteById );

module.exports = router;