const express = require('express');
const router = express.Router();

const AuthRouter = require('./authRoute');
const OrderController = require('../controllers/orderController');

router.get( '/', ( req, res, next ) => OrderController.show );

router.get( '/:id', ( req, res, next ) => OrderController.getById );

router.get( '/buyer/:id', ( req, res, next ) => OrderController.getByBuyer );

router.get( '/seller/:id', ( req, res, next ) => OrderController.getBySeller );

router.post( '/', ( req, res, next ) => OrderController.createOrder );

router.delete( '/:id', ( req, res, next ) => OrderController.deleteOrder );

module.exports = router;