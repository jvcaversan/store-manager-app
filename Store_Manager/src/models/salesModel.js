const { connection } = require('./connection');

const getSales = async () => {
  const query = `SELECT 
  sales.id AS saleId, sales.date, sales_products.product_id
  AS productId, sales_products.quantity
  FROM sales INNER JOIN sales_products
  ON sales.id = sales_products.sale_id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getSalesById = async (id) => {
  const query = `SELECT sales.date, 
  sales_products.product_id
  AS productId, quantity
  FROM sales_products
  INNER JOIN sales ON sales.id = sales_products.sale_id
  WHERE sales.id = (?)
  ORDER BY sales_products.sale_id, productId`;
  
  const [sales] = await connection.execute(query, [id]);
  return sales;
};

const sales = async (sale) => {
  const date = new Date();
  const query = 'INSERT INTO sales (date) VALUE (?)';
  const [result] = await connection.execute(query, [date]);

  await Promise.all(sale.map(async (e) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?)',
      [result.insertId, e.productId, e.quantity],
    );
  }));

  const salesResult = {
    id: result.insertId,
    itemsSold: sale,
  };
  return salesResult;
};

const salesDelete = async (id) => {
  const { affectedRows } = await connection.execute('DELETE FROM sales WHERE sales.id = ?', [id]);

  return affectedRows;
};

const deleteSalesProducts = async (id) => {
  const { affectedRows } = await connection.execute(`
  DELETE FROM StoreManager.sales_products
  WHERE sales_products.sale_id = ? `, [id]);

  return affectedRows;
};

module.exports = {
  sales,
  getSales,
  getSalesById,
  salesDelete,
  deleteSalesProducts,
  // insertSales,
};