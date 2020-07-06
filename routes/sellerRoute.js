const express = require('express');
const router = express.Router();

const SellerController = require('../controllers/sellerController');

router.get( '/', ( req, res ) => SellerController.show( req, res ) );

router.get( '/:id', ( req, res ) => SellerController.getById( req, res ) );

router.put( '/:id', ( req, res ) => SellerController.editById( req, res ) );

router.delete( '/:id', ( req, res ) => SellerController.deleteById( req, res ) );

module.exports = router;
