const mongoose = require('mongoose');

const Account = require('../models/accountModel');

const AccountController = {};

AccountController.show = function ( _, res ) {
   
    Account.find( {}, function ( error, accounts ) {
        
        if ( error ) {
            return res.status( 500 ).send( { error: error } );
        }

        if ( accounts ) {
            return res.status( 200 ).send( { account: accounts } );
        } else {
            return res.status( 404 ).send(
                {
                    message: "No accounts could be found."
                }
            );
        }
    });
}

AccountController.getById = function ( req, res ) {
    
    const id = req.params.id;
    
    Account.findById( id, function ( error, account ) {
        
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        }

        if ( account ) {
            res.status( 200 ).send( { account: account } );
        } else {
            res.status( 404 ).send(
                {
                    message: "No account could be found under such id."
                }
            );
        }
    });
}

AccountController.editById = function ( req, res ) {
    
    const id = req.params.id;
    const info = req.body.account;
    
    Account.findById( id, function ( error, account ) {
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        }

        if ( account ) {
            account.update( info, function ( error, account ) {
                if ( error ) {
                    res.status( 500 ).send( { error: error } );
                }

                if ( !account ) {
                    res.status( 500 ).send( { message: 'Server Error.' } );
                } else {
                    res.status( 200 ).send( { account: account } );
                }
            });
        } else {
            res.status( 404 ).send(
                {
                    message: "Account not found."
                }
            );
        }
    });
}

AccountController.deleteById = function ( req, res ) {
    
    const id = req.params.id;
    
    Account.remove( { _id: id }, function ( error ) {
        
        if ( error ) {
            res.status( 500 ).send( { error: error } );
        } else {
            res.status( 200 ).send( { message: 'Removed.' } );
        }
    });
}

module.exports = AccountController;