const express = require('express')
const router = express.Router()
const ExamController = require('../controllers/ExamController')
const {verifyToken, verifyTokenAndAdmin} = require('../controllers/VerifyToken')


//POST /exam
//Create exam
router.get('/get-type', ExamController.showType)
router.get('/subjects', ExamController.showSubjects)
router.get('/test/:slug', verifyToken, ExamController.showExams)
router.get('/try/:slug', ExamController.showTrialExams)
router.get('/', ExamController.showTopic)

module.exports = router