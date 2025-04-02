const pool = require("../../../database/connection");
const queries = require("../queries/productQueries");

const Product = {
  async findAll() {
    const [rows] = await pool.query(queries.findAll);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(queries.findById, [id]);
    return rows[0];
  },

  async findBySku(sku) {
    const [rows] = await pool.query(queries.findBySku, [sku]);
    return rows[0];
  },

  async create({ sku, name, description, image_path, category_id, price }) {
    const existing = await this.findBySku(sku);
    if (existing) {
      throw new Error("O código SKU já está em uso");
    }
    const [result] = await pool.query(queries.create, [
      sku,
      name,
      description,
      image_path,
      category_id,
      price,
    ]);
    return {
      id: result.insertId,
      sku,
      name,
      description,
      image_path,
      category_id,
      price,
    };
  },

  async update(id, { sku, name, description, image_path, category_id, price }) {
    const existing = await this.findBySku(sku);
    if (existing) {
      throw new Error("O código SKU já está em uso por outro produto");
    }
    const [result] = await pool.query(queries.update, [
      sku,
      name,
      description,
      image_path,
      category_id,
      price,
      id,
    ]);
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.query(queries.delete, [id]);
    return result.affectedRows > 0;
  },

  async findByCategory(category_id) {
    const [rows] = await pool.query(queries.findByCategory, [category_id]);
    return rows;
  },
};

module.exports = Product;
