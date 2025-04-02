const { findByEmail } = require("../model/User");

module.exports = {
  createUser: `INSERT INTO users (username, email, password_hash, role) 
      VALUES (?,?,?,?)`,
  findByEmail: "SELECT * FROM users WHERE email = ?",
  findAllUsers: `SELECT id, username, email, role, created_at 
  FROM users 
  ORDER BY created_at DESC
  LIMIT ? OFFSET ?`,

  countUsers: "SELECT COUNT(*) as total FROM users",
};
