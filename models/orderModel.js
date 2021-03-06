const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    uuid: {
        type: Number,
        required: true
    },
    products: [{
        type: Number,
        required: true
    }],
    buyer: {
        type: Number,
        required: true
    },
    seller: {
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