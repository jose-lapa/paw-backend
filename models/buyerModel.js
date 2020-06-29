const mongoose = require('mongoose');

const Buyer = new mongoose.Schema({
    purchases: [{
        type: Number
    }],
});

module.exports = mongoose.model('Buyer', Buyer);