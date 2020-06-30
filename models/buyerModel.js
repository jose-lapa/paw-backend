const mongoose = require('mongoose');

const Buyer = new mongoose.Schema({
    purchases: [{
        type: Number
    }],
    complaints: [{
        type: Number
    }],
    location: {
        type: string
    },
    coordinateX: {
        type: String
    },
    coordinateY: {
        type: String
    }
});

module.exports = mongoose.model('Buyer', Buyer);