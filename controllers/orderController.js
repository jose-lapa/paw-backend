const mongoose = require('mongoose');

const Order = require('../models/accountModel');
const Buyer = require('../models/buyerModel');
const Seller = require('../models/sellerModel');

const OrderController = {};

OrderController.show = function ( req, res ) {
    
    Order.find( {}, function ( error, products ) {
        if ( error ) {
            return res.status( 500 ).send( { message: 'Server Error.' });
        }

        if ( !products ) {
            return res.status( 500 ).send( { message: 'Server Error.' });
        } else {
            
        }
    })
}
