const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  postProject,
  updateProject,
  deleteProject
} = require('../controllers/project');
const { protect } = require('../middlewares/auth'); // ใช้ middleware ตรวจสอบ token

// 📌 ROUTES
router.get('/projects', getAllProjects);               // ดึงทั้งหมด
router.get('/projects/:id', getProjectById);           // ดึงรายตัว
router.post('/projects', protect, postProject);        // เพิ่มโปรเจกต์ (ต้อง login)
router.put('/projects/:id', protect, updateProject);   // แก้ไขโปรเจกต์
router.delete('/projects/:id', protect, deleteProject); // ลบโปรเจกต์

module.exports = router;
