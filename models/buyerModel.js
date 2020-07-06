const mongoose = require('mongoose');

const Buyer = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    middleName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastLocation: {
        type: String
    },
    lastCoordX: {
        type: String
    },
    lastCoordY: {
        type: String
    },
    orders: [{
        type: Number
    }],
    complaints: [{
        type: Number
    }],
});

module.exports = mongoose.model('Buyer', Buyer);