const express = require('express')
const router = express.Router()
const {getUsers,getUserById} = require('../controllers/user')

router.get('/user',getUsers)
router.get('/user/:id',getUserById)

module.exports = router