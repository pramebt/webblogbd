const db = require("../config/db");

// ดึงโปรเจกต์ทั้งหมดของผู้ใช้
exports.getAllProjects = async (req, res) => {
  try {
    const [projects] = await db.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    res.json(projects);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// ดึงโปรเจกต์ตาม id
exports.getProjectById = async (req, res) => {
  try {
    const [projects] = await db.query(
      'SELECT * FROM projects WHERE id = ?',
      [req.params.id]
    );

    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(projects[0]);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// สร้างโปรเจกต์ใหม่
const cloudinary = require('../config/cloudinary');

// ✅ ฟังก์ชันช่วย upload รูปภาพแบบ Promise
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "projects" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

exports.postProject = async (req, res) => {
  try {
    const { title, subtitle, description, demo_url, github_url } = req.body;
    const user_id = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // ✅ Upload to Cloudinary
    const result = await streamUpload(req.file.buffer);
    const image_url = result.secure_url;

    // ✅ Insert to DB
    const [dbRes] = await db.query(
      `INSERT INTO projects (user_id, title, subtitle, description, image_url, demo_url, github_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, title, subtitle, description, image_url, demo_url, github_url]
    );

    return res.status(201).json({
      id: dbRes.insertId,
      message: "Project created successfully",
    });
  } catch (err) {
    console.error("❌ Project Upload Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// อัปเดตโปรเจกต์
exports.updateProject = async (req, res) => {
  try {
    const { title, subtitle, description, demo_url, github_url, old_image_url } = req.body;
    const user_id = req.user.id;
    const projectId = req.params.id;

    // ✅ ตรวจสอบว่าโปรเจกต์นี้เป็นของ user จริงไหม
    const [existing] = await db.query(
      "SELECT * FROM projects WHERE id = ? AND user_id = ?",
      [projectId, user_id]
    );

    if (!existing.length) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }

    // ✅ ถ้ามีรูปใหม่ → อัปโหลดขึ้น Cloudinary
    let image_url = old_image_url;
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      image_url = result.secure_url;
    }

    // ✅ อัปเดตข้อมูลลง DB
    await db.query(
      `UPDATE projects SET title=?, subtitle=?, description=?, demo_url=?, github_url=?, image_url=? WHERE id=? AND user_id=?`,
      [title, subtitle, description, demo_url, github_url, image_url, projectId, user_id]
    );

    return res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    console.error("❌ Project Update Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ลบโปรเจกต์
exports.deleteProject = async (req, res) => {
  try {
    await db.query(
      'DELETE FROM projects WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
