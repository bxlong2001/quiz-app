const mongoose = require('mongoose')

const Exam = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    part: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    question: {
        type: String,
        required: true
    },
    answer_a: {
        type: String,
        required: true
    },
    answer_b: {
        type: String,
        required: true
    },
    answer_c: {
        type: String,
        required: true
    },
    answer_d: {
        type: String,
        required: true
    },
    answer_true: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('exams', Exam)