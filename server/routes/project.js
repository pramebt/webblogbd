const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  postProject,
  updateProject,
  deleteProject
} = require('../controllers/project');

const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/multer'); // 👈 ใช้ multer รับไฟล์

// 📌 ROUTES
router.get('/projects', getAllProjects);
router.get('/projects/:id', getProjectById);

// ✅ อัปโหลดไฟล์ + ข้อมูลอื่นผ่าน FormData
router.post('/projects', protect, upload.single('image'), postProject);
router.put('/projects/:id', protect, upload.single('image'), updateProject);

router.delete('/projects/:id', protect, deleteProject);

module.exports = router;
