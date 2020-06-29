const mongoose = require('mongoose');

const User = new mongoose.Schema({
	firstName: {
		type: String,
		minlength: 3,
		required: true,
	},
	lastName: {
		type: String,
		minlength: 3,
		required: true,
	},
	email: {
		type: String,
		minlength: 3,
		required: true
	},
	password: {
		type: String,
	},
	role: {
		type: String,
		default: "buyer"
	},
	dateOfBirth: {
		type: Date
	},
});

const Model = mongoose.model('User', User);

module.exports = Model;