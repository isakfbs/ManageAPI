const pool = require("../../../database/connection");
const bcrypt = require("bcryptjs");

const User = {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  },

  async create({ username, email, password, role = "user" }) {
    try {
      const passwordHash = await this.hashPassword(password);

      const [result] = await pool.query(
        `INSERT INTO users (username, email, password_hash, role) 
      VALUES (?,?,?,?)`,
        [username, email, passwordHash, role]
      );

      return { id: result.insertId, username, email, role };
    } catch (error) {
      console.error("Error creating user:", error);
    }
  },

  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },
};

module.exports = User;
