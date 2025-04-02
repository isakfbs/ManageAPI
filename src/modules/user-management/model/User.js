const pool = require("../../../database/connection");
const bcrypt = require("bcryptjs");
const queries = require("../queries/userQueries");

const User = {
  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  },

  async create({ username, email, password, role = "user" }) {
    try {
      const passwordHash = await this.hashPassword(password);

      const [result] = await pool.query(queries.createUser, [
        username,
        email,
        passwordHash,
        role,
      ]);

      return { id: result.insertId, username, email, role };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async findByEmail(email) {
    try {
      const [rows] = await pool.query(queries.findByEmail, [email]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user by email: ", error);
      throw error;
    }
  },

  async findAll(page = 1, pageSize = 10) {
    try {
      const offset = (page - 1) * pageSize;

      const [users, total] = await Promise.all([
        pool.query(queries.findAllUsers, [pageSize, offset]),
        pool.query(queries.countUsers),
      ]);

      return {
        data: users[0],
        pagination: {
          page,
          pageSize,
          total: total[0][0].total,
        },
      };
    } catch (error) {
      console.error("Error listing users: ", error);
      throw error;
    }
  },
};

module.exports = User;
