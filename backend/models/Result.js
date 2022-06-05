const mongoose = require('mongoose')

const Result = new mongoose.Schema({
    idUser: {
        type: String,
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