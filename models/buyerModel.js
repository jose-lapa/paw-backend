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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    complaints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Complaint'
    }],
});

module.exports = mongoose.model('Buyer', Buyer);