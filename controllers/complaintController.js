const { v4: uuid } = require('uuid');

const Complaint = require('../models/complaintModel');

const ComplaintController = {};

ComplaintController.show = function ( req, res ) {

    Complaint.find( {}, function ( error, complaints ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !complaints ) {
            return res.status( 404 ).send( { message: 'Not found.' });
        } else {
            return res.status( 200 ).send( { complaints: complaints });
        }
    });
}

ComplaintController.getById = function ( req, res ) {
    Complaint.find( { uuid: req.params.id }, function ( error, complaint ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !complaint ) {
            return res.status( 404 ).send( { message: 'Not found.' });
        } else {
            return res.status( 200 ).send( { complaint: complaint });
        }
    });
}

ComplaintController.create = function ( req, res ) {
    const randomBasedUuid = uuid();
    
    const ComplaintInfo = {
        uuid: randomBasedUuid,
        buyer: req.body.buyer,
        seller: req.body.seller,
        status: req.body.status
    };

    Complaint.create( ComplaintInfo, function ( error, complaint ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !complaint ) {
            return res.status( 500 ).send( { message: 'Server Error.' } );
        } else {
            return res.status( 200 ).send( { complaint: complaint } );
        }
    });
}

ComplaintController.updateById = function ( req, res ) {
    Complaint.findOneAndUpdate( { uuid: req.params.id }, req.body, function ( error, order ) {
        if ( error ) {
            return res.status( 500 ).send( 
                {
                    message: 'Server Error.',
                    error: error
                }
            );
        }

        if ( !complaint ) {
            return res.status( 404 ).send( { message: 'Not found.' } );
        } else {
            return res.status( 200 ).send( { complaint: complaint } );
        }
    });
}

ComplaintController.deleteOrder = function ( req, res ) {
    Complaint.remove( { uuid: req.params.id }, function ( error ) {
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

module.exports = ComplaintController;