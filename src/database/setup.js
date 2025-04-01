const pool = require("./connection");

module.exports = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS categories(
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image_path VARCHAR(255),
            parent_id INT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL)
        `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS products(
            id INT AUTO_INCREMENT PRIMARY KEY,
            sku VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            image_path VARCHAR(255),
            category_id INT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )`);
    console.log("Tabelas verificadas/criadas com sucesso");
  } catch (err) {
    console.log("Erro ao configurar o banco de dados", err);
  }
};
