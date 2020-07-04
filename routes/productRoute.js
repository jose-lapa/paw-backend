const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productControllers');

router.get( '/', ( req, res ) => ProductController.show( req, res ) );

router.get( '/name/:name', ( req, res ) => ProductController.getByName( req, res ) );

router.get( '/:id', ( req, res ) => ProductController.getById( req, res ) );

router.get( '/seller/:id', ( req, res ) => ProductController.getBySeller( req, res ) );

router.post( '/', ( req, res ) => ProductController.create( req, res ) );

router.put( '/:id', ( req, res ) => ProductController.updateById( req, res ) );

router.delete( '/:id', ( req, res ) => ProductController.deleteById( req, res ) );

module.exports = router;