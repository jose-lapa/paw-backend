const mongoose = require('mongoose');

const Seller = require('../models/sellerModel');

const SellerController = {};

SellerController.show = function ( _, res ) {
   
    Seller.find( {}, function ( error, sellers ) {
        
        if ( error ) {
            return res.status( 500 ).send( { error: error } );
        }

        if ( sellers ) {
            return res.status( 200 ).send( { seller: sellers } );
        } else {
            return res.status( 404 ).send(
                {
                    message: "No sellers could be found."
                }
            );
        }
    });
}

SellerController.getById = function ( req, res ) {
    
    const id = req.params.id;
    
    Seller.findById( id, function ( error, seller ) {
        
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        }

        if ( seller ) {
            res.status( 200 ).send( { seller: seller } );
        } else {
            res.status( 404 ).send(
                {
                    message: "No seller could be found under such id."
                }
            );
        }
    });
}

SellerController.editById = function ( req, res ) {
    
    const id = req.params.id;
    const info = req.body.seller;
    
    Seller.findById( id, function ( error, seller ) {
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        }

        if ( seller ) {
            seller.update( info, function ( error, seller ) {
                if ( error ) {
                    res.status( 500 ).send( { error: error } );
                }

                if ( !seller ) {
                    res.status( 500 ).send( { message: 'Server Error.' } );
                } else {
                    res.status( 200 ).send( { seller: seller } );
                }
            });
        } else {
            res.status( 404 ).send(
                {
                    message: "Seller not found."
                }
            );
        }
    });
}

SellerController.deleteById = function ( req, res ) {
    
    const id = req.params.id;
    
    Seller.remove( { _id: id }, function ( error ) {
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

module.exports = SellerController;