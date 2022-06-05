const express = require('express')
const router = express.Router()
const authController = require('../controllers/AuthController')
const {verifyToken} = require('../controllers/VerifyToken')

router.get('/',verifyToken, authController.check)
router.post('/register', authController.register)
router.post('/login',authController.login)

module.exports = router