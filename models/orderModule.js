const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    uuid: {
        type: Number,
        required: true
    },
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
        required: true,
        default: "In treatment"
    },
    note: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Order', Order);