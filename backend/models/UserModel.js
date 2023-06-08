const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    privacy: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})


const users = mongoose.model('inusers', UserSchema);

module.exports = users;