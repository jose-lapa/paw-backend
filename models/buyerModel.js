const mongoose = require('mongoose');

const Buyer = new mongoose.Schema({
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