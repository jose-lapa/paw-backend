const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    uuid: {
        type: Number,
        required: true
    },
    seller: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', Product);