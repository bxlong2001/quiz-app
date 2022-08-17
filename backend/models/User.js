const mongoose = require('mongoose')
require('dotenv').config()

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
    avt: {
        type: String,
        default: 'https://res.cloudinary.com/aptestcloud/image/upload/v1660753640/img/no-avatar.png'
    },
    fullname: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    point: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model('users', User)