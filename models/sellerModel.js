const mongoose = require('mongoose');

const Seller = new mongoose.Schema({
    email: {
        type: String
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