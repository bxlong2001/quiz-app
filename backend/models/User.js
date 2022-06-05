const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    admin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('users', User)