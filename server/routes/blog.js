const express = require('express')
const router = express.Router()
const {getAllBlogs, getBlogsById,postBlogs,updateBlogs,deleteBlogs} = require('../controllers/blog')
const { protect } = require('../middlewares/auth')

router.get('/blogs', getAllBlogs)
router.get('/blogs/:id', getBlogsById)
router.post('/blogs', protect, postBlogs)
router.put('/blogs/:id', protect, updateBlogs)
router.delete('/blogs/:id', protect, deleteBlogs)

module.exports = router;