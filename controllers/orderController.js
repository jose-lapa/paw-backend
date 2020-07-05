const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const Order = require('../models/accountModel');
const Buyer = require('../models/buyerModel');
const Seller = require('../models/sellerModel');

const OrderController = {};

OrderController.show = function ( _, res ) {
    Order.find( {}, function ( error, orders ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !orders ) {
            return res.status( 404 ).send( { message: 'Not found.' });
        } else {
            return res.status( 200 ).send( { orders: orders });
        }
    });
}

OrderController.getById = function ( req, res ) {
    Order.findById( req.params.id, function ( error, orders) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !orders ) {
            return res.status( 404 ).send( { message: 'Not found.' });
        } else {
            return res.status( 200 ).send( { orders: orders });
        }
    })
}

OrderController.createOrder = function ( req, res ) {

    const randomBasedUuid = uuid();
    
    const OrderInfo = {
        uuid: randomBasedUuid,
        products: req.body.products,
        buyer: req.body.buyer,
        seller: req.body.seller,
        status: req.body.status,
        note: req.body.note
    };

    Order.create( OrderInfo, function ( error, order ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !order ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        } else {
            return res.status( 200 ).send( { order: order } );
        }
    });
}

OrderController.updateById = function ( req, res ) {
    Order.findOneAndUpdate( { uuid: req.params.id }, req.body, function ( error, order ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !order ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { order: order } );
        }
    });
}

OrderController.deleteOrder = function ( req, res ) {
    Order.remove( { uuid: req.params.id }, function ( error ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        } else {
            return res.status( 200 ).send( { message: 'Deleted.' } );
        }
    })
}

module.exports = OrderController;