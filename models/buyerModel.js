const mongoose = require('mongoose');

const Buyer = new mongoose.Schema({
    email: {
        type: String,
        required: true
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