const mongoose = require('mongoose')

const Subject = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique:true
    },
    img: {
        type: String,
        required: true
    },
    type: {
        type: Array,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('subject', Subject)