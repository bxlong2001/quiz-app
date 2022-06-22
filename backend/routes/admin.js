const express = require('express')
const adminController = require('../controllers/AdminController')
const examController = require('../controllers/ExamController')
const { verifyTokenAndAdmin } = require('../controllers/VerifyToken')
const router = express.Router()
const multer = require('multer')

//Set Storage File
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, "uploads/");
          } else {
            cb(null, false);
          }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFilter
})

router.get('/users', verifyTokenAndAdmin, adminController.showUsers)
router.delete('/users/delete/:id', verifyTokenAndAdmin, adminController.deleteUser)
router.get('/exams', verifyTokenAndAdmin, examController.showTopic)
router.post('/exams/create', verifyTokenAndAdmin, adminController.createExam)
router.post('/exams/save-img', verifyTokenAndAdmin,  upload.single('img-quiz'), adminController.saveImg)
router.put('/exams/update/:id', verifyTokenAndAdmin, adminController.updateExam)
router.delete('/exams/delete/:id', verifyTokenAndAdmin, adminController.deleteExam)
router.get('/exams/:slug', verifyTokenAndAdmin, adminController.showExams)
router.get('/count', verifyTokenAndAdmin, adminController.statistic)

module.exports = router