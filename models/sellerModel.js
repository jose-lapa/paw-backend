const mongoose = require('mongoose');

const Seller = new mongoose.Schema({
    products: [{
        type: Number
    }],
    orders: [{
        type: Number
    }],
});

module.exports = mongoose.model('Seller', Seller);