const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Buyer = require('../models/buyerModel');
const Seller = require('../models/sellerModel');

const AuthController = {};

AuthController.registerBuyer = function ( req, res ) {
	
	const hash = bcrypt.hashSync( req.body.password, 8 );

	const accountInfo = {
		email: req.body.email,
		password: hash,
		firstName: req.body.firstName,
		middleName: req.body.lastName,
		lastName: req.body.lastName
	}

	Buyer.create( accountInfo, function ( error, buyer ) {
		if ( error ) {
			return res.status( 500 ).send({
				auth: false,
				message: "Server Error.",
				error: error
			});
		}

		if ( buyer ) {

			const token = jwt.sign( { id: id }, process.env.TOKEN_SECRET, {
				expiresIn: 30 * 60
			});


			return  res.status(200).send({
				auth: true,
				token: token,
				id: buyer
			});
		}
	});
}

AuthController.registerSeller = function ( req, res ) {
		
	const hash = bcrypt.hashSync( req.body.password, 8 );

	const accountInfo = {
		email: req.body.email,
		password: hash,
		firstName: req.body.firstName,
		middleName: req.body.lastName,
		lastName: req.body.lastName
	}

	Seller.create( accountInfo, function ( error, seller ) {
		if ( error ) {
			return res.status( 500 ).send({
				auth: false,
				message: "Server Error.",
				error: error
			});
		}

		if ( seller ) {

			const token = jwt.sign( { id: id }, process.env.TOKEN_SECRET, {
				expiresIn: 30 * 60
			});


			return  res.status(200).send({
				auth: true,
				token: token,
				id: seller
			});
		}
	});
}

/**
 * WARNING: DUPLICATE CODE TO FIX
 */
AuthController.login = function ( req, res ) {
	Buyer.find( { email: req.body.email }, function ( error, buyer ) {
		if ( error ) {
			return res.status( 500 ).send( 'Server error.' );
		}

		if ( !buyer ) {
            
			Seller.find( { email: req.body.email }, function ( error, seller ) {
                if ( error ) {
                    return res.status( 500 ).send( 'Server error.' );
                } 

                if ( !seller ) {
                    return res.status( 404 ).send( 'Not found.' );
                } else {
                    bcrypt.compare( req.body.password, account.password, function ( error, isMatch ) {
                        if ( error ) {
                            return res.status( 500 ).send( 'Server error.' );
                        }
        
                        if ( !isMatch ) {
                            return res.status( 401 ).send({
                                auth: false,
                                token: null
                            });
                        } else {
                            const token = jwt.sign({
                                id: seller._id
                            }, process.env.TOKEN_SECRET, {
                                expiresIn: 30 * 60
                            });
        
                            return res.status( 200 ).send({
                                auth: true,
                                token: token
                            });
                        }
                    });
                }
            });
		} else {
			bcrypt.compare( req.body.password, account.password, function ( error, isMatch ) {
				if ( error ) {
					return res.status( 500 ).send( 'Server error.' );
				}

				if ( !isMatch ) {
					return res.status( 401 ).send({
						auth: false,
						token: null
					});
				} else {
					const token = jwt.sign({
						id: buyer._id
					}, process.env.TOKEN_SECRET, {
						expiresIn: 30 * 60
					});

					return res.status( 200 ).send({
						auth: true,
						token: token
                    });
				}
			});
		}
	});
}

AuthController.logout = function ( _, res ) {
	return res.status( 200 ).send({
		auth: false,
		token: null
	});
}

AuthController.verifyToken = function ( req, res, next ) {

	const token = req.headers['x-access-token'];

	if ( !token ) {
		return res.status( 403 ).send({
			auth: false,
			message: 'No token provided'
		});
	}

	jwt.verify( token, process.env.TOKEN_SECRET, function ( error, decoded ) {
		if ( error ) {
			return res.status( 500 ).send({
				auth: false,
				message: 'Server Error.'
			});
		}

		req.id = decoded.id;
		next();
	});
}

module.exports = AuthController;