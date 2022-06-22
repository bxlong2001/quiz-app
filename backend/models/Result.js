const mongoose = require('mongoose')

const Result = new mongoose.Schema({
    idUser: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    examName: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    },
    result: {
        type: Number,
        required: true
    },
    timeWork: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('results', Result)