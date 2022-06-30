const Exam = require('../models/Exam')
const Subject = require('../models/Subject')

const ExamController = {
    showSubjects: async (req, res) => {
        try {
            const subjects = await Subject.aggregate(
                [
                    {$sort: {title: 1}},
                ]
            )
            res.json({success: true, subjects})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    showExams: async (req, res) => {
        const {slug} = req.params
        try {
            const time = await Subject.findOne({'type.code': slug}, {'type.$': 1})
            if(slug.split('-')[0] !== 'ta') {
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
                if(!exams1 || !exams2 || !exams3 || !time)
                    return res.status(400).json({success: false, message: 'Không tìm thấy đề thi'})
                return res.json({success: true, exams: [...exams1, ...exams2, ...exams3], time: time})
            }

            const examsE = await Exam.find({name: slug})
            if(!examsE)
                return res.status(400).json({success: false, message: 'Không tìm thấy đề thi'})
            return res.json({success: true, exams: examsE, time: time})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    showTrialExams: async (req, res) => {
        const {slug} = req.params
        try {
            const exams = await Exam.find({name: slug}).limit(10)
            res.json({success: true, exams})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    showTopic: async (req, res) => {
        try {
            const topics = await Exam.distinct('name')
            res.json({success: true, topics})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    showType: async (req, res) => {
        try {
            const topics = await Exam.distinct('type')
            res.json({success: true, topics})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    }
}

module.exports = ExamController