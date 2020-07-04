const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Account = require('../models/accountModel');
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

	Buyer.create( { }, function ( error, buyer ) {
		if ( error ) {
			return res.status(500).send({
				auth: false,
				message: "Server Error.",
				error: error
			});
		}

		if ( buyer ) {
			accountInfo._buyer = buyer._id;
			registerAccount( accountInfo );
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

	Seller.create( { }, function ( error, seller ) {
		if ( error ) {
			return res.status(500).send({
				auth: false,
				message: "Server Error.",
				error: error
			});
		}

		if ( seller ) {
			accountInfo._seller = seller._id;
			registerAccount( accountInfo );
		}
	});
}

function registerAccount ( info ) {
	Account.create( info, function ( error, account ) {
		if ( error ) {
			return res.status(500).send({
				auth: false,
				message: "Server Error.",
				error: error
			});
		}

		if ( account ) {
			const token = jwt.sign( { id: account._id }, "jfasifasp0332i", {
				expiresIn: 30 * 60
			});

			return  res.status(200).send({
				auth: true,
				token: token,
				id: account._id
			});
		}
	});
}
	
AuthController.login = function ( req, res ) {
	Account.findOne({
		email: req.body.email
	}, function ( error, account ) {
		if ( error ) {
			return res.status( 500 ).send( 'Server error.' );
		}

		if ( !account ) {
			return res.status( 404 ).send( 'User not found.' );
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
						id: account._id
					}, "jfasifasp0332i", {
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

AuthController.logout = function ( req, res ) {
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

	jwt.verify( token, "jfasifasp0332i", function ( error, decoded ) {
		if ( error ) {
			return res.status( 500 ).send({
				auth: false,
				message: 'Failed to authenticate!'
			});
		}

		req.accountId = decoded.id;
		next();
	});
}

module.exports = AuthController;