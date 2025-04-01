const pool = require("../../../database/connection");
const queries = require("../queries/categoryQueries");

const Category = {
  async findAll() {
    const [rows] = await pool.query(queries.findAll);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(queries.findById, [id]);
    return rows[0];
  },

  async findByParentId(parentId) {
    const [rows] = await pool.query(queries.findByParentId, [parentId]);
    return rows;
  },

  async create({ name, image_path, parent_id }) {
    const [result] = await pool.query(queries.create, [
      name,
      image_path,
      parent_id || null,
    ]);
    return { id: result.insertID, name, image_path, parent_id };
  },

  async update(id, { name, image_path, parent_id }) {
    const [result] = await pool.query(queries.update, [
      name,
      image_path,
      parent_id || null,
      id,
    ]);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [check] = await pool.query(queries.checkProducts, [id]);
    if (check[0].product_count > 0) {
      throw new Error(
        "Não é possivel excluir categoria com produtos associados"
      );
    }

    const [result] = await pool.query(queries.delete, [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Category;
