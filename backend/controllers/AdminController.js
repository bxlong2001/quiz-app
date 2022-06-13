const argon2 = require('argon2')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const Exam = require('../models/Exam')
const Result = require('../models/Result')
const Subject = require('../models/Subject')

const AdminController = {
    statistic: async (req, res) => {
        try {
            let statistics = {}
            const countUser = await User.count({admin: false})
            const countSubject = await Subject.count()
            const countExam = await Subject.aggregate([{$project: {count: {$size: '$type'}}}])
            const countQuiz = await Exam.count()
            const sortUser = await User.find({admin: false}, {'password': 0}).limit(4).sort({'createdAt': -1})
            const sortResult = await Result.aggregate([
                {
                    $limit: 9
                },
                {
                    $sort: {
                        'updatedAt': -1
                    }
                },
                {   
                    $lookup: {
                        from: 'users',
                        localField: 'idUser',
                        foreignField: '_id',
                        as: 'infoUser'
                    }
                }
            ])

            statistics = {countUser, countSubject, countExam, countQuiz, sortUser, sortResult}
            res.json({success: true, statistics})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    showUsers: async (req, res) => {
        try {
            const users = await User.find()
            res.json({success: true, users})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    deleteUser: async (req, res) => {
        const {id} = req.params
        try {
            const deleteUser = await User.findOneAndDelete({_id: id})
            if(deleteUser){
                const findResult = await Result.findOne({idUser: id})
                if(findResult){
                    const deleteResult = await Result.deleteMany({idUser: id})
                    if(deleteResult)
                        return res.json({success: true, message: 'Xóa người dùng và kết quả thành công'})
                    return res.status(401).json({success: false,message: 'Xóa kết quả thất bại'})
                }
                return res.json({success: true, message: 'Xóa người dùng thành công'})
            }else 
                return res.status(401).json({success: false,message: 'Xóa người dùng thất bại'})
            
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },

    showExams: async (req, res) => {
        const {slug} = req.params
        const {page = 1, pagesize = 15} = req.query
        try {
            const totalCount = await Exam.find({'name': slug}).count()
            const exams = await Exam.find({'name': slug}).skip((page-1)*pagesize).limit(pagesize)
            res.json({success: true, exams, totalCount})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    },

    createExam: async (req, res) => {
        const {name, type, question, img, answer_a, answer_b, answer_c, answer_d, answer_true, part} = req.body

        if(!name|| !part || !type || !question || !answer_a || !answer_b || !answer_c || !answer_d || !answer_true)
            return res.status(400).json({success: false, message: 'Tạo thất bại'})

        try {
            const newExam = new Exam({ name, type, part, question, img, answer_a, answer_b, answer_c, answer_d, answer_true })

            await newExam.save()

            res.status(200).json({success: true, message: 'Tạo thành công', newExam})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, message: 'Lỗi server'})
        }
    },

    updateExam: async (req, res) => {
        const {id} = req.params
        try {
            const updateExam = await Exam.findOneAndUpdate({_id: id}, {...req.body})
            if(!updateExam)
                return res.status(401).json({success: false,message: 'Sửa thất bại'})
            res.json({success: true, message: 'Thay đổi thành công', exam: updateExam})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    },

    deleteExam: async (req, res) => {
        const {id} = req.params
        try {
            const deleteExam = await Exam.findOneAndDelete({_id: id})
            if(!deleteExam)
                return res.status(401).json({success: false,message: 'Xóa thất bại'})
            res.json({success: true, message: 'Xóa thành công'})
        }catch(error){
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
}

module.exports = AdminController