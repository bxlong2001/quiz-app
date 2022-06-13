const Exam = require('../models/Exam')
const Subject = require('../models/Subject')

const ExamController = {
    showSubjects: async (req, res) => {
        try {
            const subjects = await Subject.aggregate(
                [
                    {$sort: {title: 1}}
                ]
            )
            res.json({success: true, subjects})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    showExams: async (req, res) => {
        const {slug} = req.params
        try {
            const exams = await Exam.aggregate([
                { $match: { name: slug } },
                { $sample: { size: 20 } }
            ])
            res.json({success: true, exams})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    showTrialExams: async (req, res) => {
        const {slug} = req.params
        try {
            const exams = await Exam.find({name: slug}).limit(10)
            res.json({success: true, exams})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    showTopic: async (req, res) => {
        try {
            const topics = await Exam.distinct('name')
            res.json({success: true, topics})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    showType: async (req, res) => {
        try {
            const topics = await Exam.distinct('type')
            res.json({success: true, topics})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = ExamController