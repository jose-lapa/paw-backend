const Account = require('../models/accountModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthController = {};

AuthController.register = function (req, res) {

	const hash = bcrypt.hashSync(req.body.password, 8);

	const accountInfo = {
		email: req.body.email,
		password: hash,
		firstName: req.body.firstName,
		middleName: req.body.lastName,
		lastName: req.body.lastName
	}

	Account.create(accountInfo,
			function (error, account) {
		if (error) {
			return res.status(500).send({
				auth: false,
				message: "There was a problem registering the User",
				error: error
			});
		}

		if (account) {
			const token = jwt.sign({
					id: user._id
				},
				"jfasifasp0332i", {
					expiresIn: 30 * 60
				}
			);

			res.status(200).send({
				auth: true,
				token: token
			})
		}
	});
}

AuthController.login = function (req, res) {
	Account.findOne({
		email: req.body.email
	}, function (error, account) {
		if (error) {
			return res.status(500).send('Server error. Retry');
		}

		if (!account) {
			res.status(404).send('User not found');
		} else {
			bcrypt.compare(req.body.password, account.password, function (error, isMatch) {
				if (error) {
					return res.status(500).send('Server error. Retry');
				}

				if (!isMatch) {
					return res.status(401).send({
						auth: false,
						token: null
					});
				} else {

					const token = jwt.sign({
						id: account._id
					}, "jfasifasp0332i", {
						expiresIn: 30 * 60
					});

					return res.status(200).send({
						auth: true,
						token: token
                    });
				}
			});
		}
	});
}

AuthController.logout = function (req, res) {
	res.status(200).send({
		auth: false,
		token: null
	});
}

AuthController.verifyToken = function (req, res, next) {

	const token = req.headers['x-access-token'];

	if (!token) {
		return res.status(403).send({
			auth: false,
			message: 'No token provided'
		});
	}

	jwt.verify(token, "jfasifasp0332i", function (error, decoded) {
		if (error) {
			return res.status(500).send({
				auth: false,
				message: 'Failed to authenticate!'
			});
		}

		req.accountId = decoded.id;
		next();
	});
}

module.exports = AuthController;