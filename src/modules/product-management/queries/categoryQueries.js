module.exports = {
  findAll: `
        SELECT c.*, p.name as parent_name 
        FROM categories c
        LEFT JOIN categories p ON c.parent_id = p.id
        ORDER BY c.name
        `,
  findById: "SELECT * FROM categories WHERE id = ?",
  findByParentId: "SELECT * FROM categories WHERE parent_id = ?",
  create: "INSERT INTO categories (name, image_path, parent_id) VALUES (?,?,?)",
  update:
    "UPDATE categories SET name = ?, image_path = ?, parent_id = ? WHERE id = ?",
  delete: "DELETE FROM categories WHERE id = ?",
  checkProducts:
    "SELECT COUNT(*) as product_count FROM products WHERE category_id = ?",
};
