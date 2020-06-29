const mongoose = require('mongoose');

const Account = new mongoose.Schema({
    
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Name'
    },
    _buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer'
    },
    _seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }
});

module.exports = mongoose.model('AccountModel', Account);