const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()
const { verifyToken } = require('../controllers/VerifyToken')
const { upload } = require('../utils/upload')

router.patch('/info/update-avatar', verifyToken, upload.single('avt'), UserController.updateAvatar)
router.patch('/info/update-fullname', verifyToken, UserController.updateInfo)
router.patch('/info/update-password', verifyToken, UserController.updatePassword)
router.patch('/myrank', verifyToken, UserController.showRank)

module.exports = router
