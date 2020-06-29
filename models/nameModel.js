const mongoose = require('mongoose');

const Name = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('NameModel', Name);