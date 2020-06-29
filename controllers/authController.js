const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const AuthController = {};

AuthController.register = function (req, res) {

	const hash = bcrypt.hashSync(req.body.password, 8);

	const userInput = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		hash: hash,
	}

	User.create(userInput,
			function (error, user) {
		if (error) {
			return res.status(500).send({
				auth: false,
				message: "There was a problem registering the User",
				error: error
			});
		}

		if (user) {
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
	User.findOne({
		email: req.body.email
	}, function (error, user) {
		if (error) {
			return res.status(500).send('Server error. Retry');
		}

		if (!user) {
			res.status(404).send('User not found');
		} else {
			bcrypt.compare(req.body.password, user.hash, function (error, isMatch) {
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
						id: user._id
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

		req.userId = decoded.id;
		next();
	});
}

AuthController.verifyHigherPermission = function (req, res, next) {
	User.findById(req.user.id, function (error, user) {
		if (error) {
			return res.status(500).send("There was a problem finding the User.");
		}

		if (!user) {
			return res.status(404).send("No user found.");
		}

		if (user.role === 'Admin' || user.role === 'Tech') {
			next();
		} else {
			return res.status(403).send({
				auth: false,
				message: 'Not authorized!'
			});
		}
	});
}

AuthController.verifyAdmin = function (req, res, next) {
	User.findById(req.user.id, function (error, user) {
		if (error) {
			return res.status(500).send("There was a problem finding the User.");
		}

		if (!user) {
			return res.status(404).send("No user found.");
		}

		if (user.role === 'Admin') {
			next();
		} else {
			return res.status(403).send({
				auth: false,
				message: 'Not authorized!'
			});
		}
	});
}

module.exports = AuthController;