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
    result: {
        type: String,
        required: true
    },
    timeWork: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('results', Result)