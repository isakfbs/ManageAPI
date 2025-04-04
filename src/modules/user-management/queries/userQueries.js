const { findByEmail } = require("../model/User");

module.exports = {
  createUser: `INSERT INTO users (username, email, password_hash, role) 
      VALUES (?,?,?,?)`,
  findById:
    "SELECT id, username, email, role, created_at, updated_at FROM users WHERE id = ?",
  findByEmail: "SELECT * FROM users WHERE email = ?",
  findAllUsers: `SELECT id, username, email, role, created_at 
  FROM users 
  ORDER BY created_at DESC
  LIMIT ? OFFSET ?`,
  countUsers: "SELECT COUNT(*) as total FROM users",
  updateUser:
    "UPDATE users SET username = ?, email = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  updatePassword:
    "UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
  deleteUser: "DELETE FROM users WHERE id = ?",
};
