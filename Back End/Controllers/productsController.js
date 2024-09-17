const pool = require("./../config/dbConfig");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error creating product" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4",
      [name, price, description, id]
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: "Error updating product" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
