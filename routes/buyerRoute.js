const express = require('express');
const router = express.Router();

const BuyerController = require('../controllers/buyerController');

router.get( '/', ( req, res ) => BuyerController.show( req, res ) );

router.get( '/:id', ( req, res ) => BuyerController.getById( req, res ) );

router.put( '/:id', ( req, res ) => BuyerController.editById( req, res ) );

router.delete( '/:id', ( req, res ) => BuyerController.deleteById( req, res ) );

module.exports = router;
