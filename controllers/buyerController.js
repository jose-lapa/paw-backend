const mongoose = require('mongoose');

const Buyer = require('../models/buyerModel');

const BuyerController = {};

BuyerController.show = function ( _, res ) {
   
    Buyer.find( {}, function ( error, buyers ) {
        
        if ( error ) {
            return res.status( 500 ).send( { error: error } );
        }

        if ( buyers ) {
            return res.status( 200 ).send( { buyers: buyers } );
        } else {
            return res.status( 404 ).send(
                {
                    message: "No buyers could be found."
                }
            );
        }
    });
}

BuyerController.getById = function ( req, res ) {
    
    const id = req.params.id;
    
    Buyer.findById( id, function ( error, buyer ) {
        
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        }

        if ( buyer ) {
            res.status( 200 ).send( { buyer: buyer } );
        } else {
            res.status( 404 ).send(
                {
                    message: "No buyer could be found under such id."
                }
            );
        }
    });
}

BuyerController.editById = function ( req, res ) {
    
    const id = req.params.id;
    const info = req.body.buyer;
    
    Buyer.findById( id, function ( error, buyer ) {
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        }

        if ( buyer ) {
            buyer.update( info, function ( error, buyer ) {
                if ( error ) {
                    res.status( 500 ).send( { error: error } );
                }

                if ( !buyer ) {
                    res.status( 500 ).send( { message: 'Server Error.' } );
                } else {
                    res.status( 200 ).send( { buyer: buyer } );
                }
            });
        } else {
            res.status( 404 ).send(
                {
                    message: "Buyer not found."
                }
            );
        }
    });
}

BuyerController.deleteById = function ( req, res ) {
    
    const id = req.params.id;
    
    Buyer.remove( { _id: id }, function ( error ) {
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
    });
}

module.exports = BuyerController;