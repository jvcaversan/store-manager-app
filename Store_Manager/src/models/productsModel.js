const { connection } = require('./connection');

const getProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return result;
};

const getProductsById = async (id) => {
  const [[result]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
};

const newProducts = async ({ name }) => {
  const [result] = await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return result.insertId;
};

const productUpdate = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
};

const productDelete = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

const getTerm = async (name) => {
  const [result] = await connection.execute(`SELECT * FROM 
  products WHERE name LIKE ?`, [`%${name}%`]);
  return result;
};
module.exports = {
  getProducts,
  getProductsById,
  newProducts,
  productUpdate,
  productDelete,
  getTerm,
};