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

  async findById(id) {
    try {
      const [rows] = await pool.query(queries.findById, [id]);
      if (!rows[0]) {
        throw new Error("Usuário não encontrado");
      }
      return rows[0];
    } catch (error) {
      console.error("Error finding user by ID:", error);
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

  async update(id, { username, email, role }) {
    try {
      const [result] = await pool.query(queries.updateUser, [
        username,
        email,
        role,
        id,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("Nenhum usuário foi atualizado");
      }

      return this.findById(id);
    } catch (error) {
      console.error("Error updating user: ", error);
      throw error;
    }
  },

  async updatePassword(id, newPassword) {
    try {
      const passwordHash = await this.hashPassword(newPassword);
      const [result] = await pool.query(queries.updatePassword, [
        passwordHash,
        id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating password: ", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const [result] = await pool.query(queries.deleteUser, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting user: ", error);
      throw error;
    }
  },
};

module.exports = User;
