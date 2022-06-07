const express = require('express')
const adminController = require('../controllers/AdminController')
const examController = require('../controllers/ExamController')
const { verifyTokenAndAdmin } = require('../controllers/VerifyToken')
const router = express.Router()

router.get('/users', verifyTokenAndAdmin, adminController.showUsers)
router.delete('/users/delete/:id', verifyTokenAndAdmin, adminController.deleteUser)
router.get('/exams', verifyTokenAndAdmin, examController.showTopic)
router.post('/exams/create', verifyTokenAndAdmin, adminController.createExam)
router.put('/exams/update/:id', verifyTokenAndAdmin, adminController.updateExam)
router.delete('/exams/delete/:id', verifyTokenAndAdmin, adminController.deleteExam)
router.get('/exams/:slug', verifyTokenAndAdmin, adminController.showExams)
router.get('/count', verifyTokenAndAdmin, adminController.statistic)

module.exports = router