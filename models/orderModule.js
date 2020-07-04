const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    uuid: {
        type: Number,
        required: true
    },
    _products: [{
        type: Number,
        required: true
    }],
    _buyer: {
        type: Number,
        required: true
    },
    _seller: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "In treatment"
    },
    note: {
        type: String,
    }
});

module.exports = mongoose.model('Order', Order);