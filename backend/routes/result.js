const express = require('express')
const router = express.Router()
const ResultController = require('../controllers/ResultController')
const {verifyToken} = require('../controllers/VerifyToken')


//POST /result
router.post('/save', verifyToken, ResultController.save)
router.get('/rank/:slug', ResultController.rank)
router.get('/all', verifyToken, ResultController.showAll)
router.get('/', verifyToken, ResultController.show)

module.exports = router