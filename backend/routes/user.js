const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const {verifyToken} = require('../controllers/VerifyToken')
const multer = require('multer')

//Set Storage File
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, "../frontend/public/img/");
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

router.patch('/info/:id/update-avatar', verifyToken, upload.single('avt'), UserController.updateAvatar)
router.patch('/info/:id/update-fullname', verifyToken, UserController.updateInfo)
router.patch('/info/:id/update-password', verifyToken, UserController.updatePassword)

module.exports = router
