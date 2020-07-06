const mongoose = require('mongoose');

const Seller = new mongoose.Schema({
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
    orders: [{
        type: Number
    }],
    complaints: [{
        type: Number
    }],
    products: [{
        type: Number
    }]
});

module.exports = mongoose.model('Seller', Seller);