const { update } = require("../models/Category");

module.exports = {
  findAll: `SELECT p.*, c.name as category_name 
        FROM products p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.name
        `,
  findById: `SELECT p.*, c.name as category_name 
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = ?`,
  findBySku: "SELECT * FROM products WHERE sku = ?",
  create:
    "INSERT INTO products (sku, name, description, image_path, category_id, price)" +
    " VALUES (?,?,?,?,?,?)",
  update:
    "UPDATE products SET sku = ?, name = ?, description = ?, image_path = ?, category_id = ?, price = ? " +
    " WHERE id = ?",
  delete: "DELETE FROM products WHERE id = ?",
  findByCategory: "SELECT * FROM products WHERE category_id = ?",
};
