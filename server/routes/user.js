const express = require('express')
const router = express.Router()
const {getUsers,getUserById} = require('../controllers/user')
const { protect } = require('../middlewares/auth')

router.get('/user',protect,getUsers)
router.get('/user/:id',protect,getUserById)

module.exports = router