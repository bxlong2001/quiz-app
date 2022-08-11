const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const {verifyToken} = require('../controllers/VerifyToken')
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

router.patch('/info/update-avatar', verifyToken, upload.single('avt'), UserController.updateAvatar)
router.patch('/info/update-fullname', verifyToken, UserController.updateInfo)
router.patch('/info/update-password', verifyToken, UserController.updatePassword)
router.patch('/myrank', verifyToken, UserController.showRank)

module.exports = router
