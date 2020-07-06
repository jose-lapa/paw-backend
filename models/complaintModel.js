const mongoose = require('mongoose');

const Complaint = new mongoose.Schema({
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
    product: {
        type: Number
    },
    status: {
        type: String,
        required: true,
        default: "In treatment"
    }
});

module.exports = mongoose.model('Complaint', Complaint);