const jwt = require("jsonwebtoken")
require("dotenv").config()

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ✅ เปลี่ยนเป็น req.user
    next();
  } catch (err) {
    console.error("JWT verify failed:", err); // 👈 ช่วยดู error จริง
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { protect };
