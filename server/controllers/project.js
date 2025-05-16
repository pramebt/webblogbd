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
exports.postProject = async (req, res) => {
  try {
    const { title, subtitle, description, image_url, demo_url, github_url } = req.body;
    const user_id = req.user.id; // ต้องใช้ middleware auth แบบเดียวกับ blogs

    const [result] = await db.query(
      `INSERT INTO projects 
       (user_id, title, subtitle, description, image_url, demo_url, github_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, title, subtitle, description, image_url, demo_url, github_url]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// อัปเดตโปรเจกต์
exports.updateProject = async (req, res) => {
  try {
    const { title, subtitle, description, image_url, demo_url, github_url } = req.body;

    await db.query(
      `UPDATE projects 
       SET title = ?, subtitle = ?, description = ?, image_url = ?, demo_url = ?, github_url = ?, updated_at = NOW()
       WHERE id = ? AND user_id = ?`,
      [title, subtitle, description, image_url, demo_url, github_url, req.params.id, req.user.id]
    );

    res.json({ message: 'Project updated' });
  } catch (error) {
    res.status(500).send("Internal Server Error");
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
