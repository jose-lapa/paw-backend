const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const OrderController = require('../controllers/orderController');

router.get( '/', ( req, res ) => OrderController.show( req, res ) );

router.get( '/:id', ( req, res ) => OrderController.getById( req, res ) );

router.post( '/', ( req, res ) => OrderController.createOrder( req, res ) );

router.put( '/:id', ( req, res ) => OrderController.updateById( req, res ) );

router.delete( '/:id', ( req, res ) => OrderController.deleteOrder( req, res ) );

module.exports = router;