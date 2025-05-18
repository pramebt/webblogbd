const multer = require('multer');
const storage = multer.memoryStorage(); // จัดเก็บใน memory เพื่ออัปโหลดขึ้น Cloudinary
const upload = multer({ storage });

module.exports = upload;