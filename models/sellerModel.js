const mongoose = require('mongoose');

const Seller = new mongoose.Schema({
    products: [{
        type: Number
    }],
    sales: [{
        type: Number
    }],
});

module.exports = mongoose.model('Seller', Seller);