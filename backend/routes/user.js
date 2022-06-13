const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const {verifyToken} = require('../controllers/VerifyToken')
const multer = require('multer')

//Set Storage File
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
            return cb(null, '../frontend/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

router.post('/info/update/:id/upload-avt', upload.single('imageURL'), verifyToken, UserController.updateAvatar)
router.patch('/info/update/:id', verifyToken, UserController.updateInfo)

module.exports = router
