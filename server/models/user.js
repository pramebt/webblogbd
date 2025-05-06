const db = require('../config/db')

exports.findUserByEmail = async(email) => {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    )
    return rows[0];
}

exports.createUser = async ({ username, email, password }) => {
    await db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password, "local"]
    );
};