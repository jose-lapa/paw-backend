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
    firstName: {
        type: String,
        required: true,
        minlength: 3
    },
    middleName: {
        type: String,
        required: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3
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