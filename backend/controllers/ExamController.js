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
            const exams1 = await Exam.aggregate([
                { $match: { name: slug, part: '1' } },
                { $sample: { size: 7 } }
            ])
            const exams2 = await Exam.aggregate([
                { $match: { name: slug, part: '2' } },
                { $sample: { size: 7 } }
            ])
            const exams3 = await Exam.aggregate([
                { $match: { name: slug, part: '3' } },
                { $sample: { size: 6 } }
            ])
            res.json({success: true, exams1, exams2, exams3})
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