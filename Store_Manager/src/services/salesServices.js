const salesModel = require('../models/salesModel');
const allProducts = require('./productsService');

const getSales = async () => {
  const sales = await salesModel.getSales();
  return sales;
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  
  if (sales.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }

  return { type: null, message: sales };
};

const sales = async (sale) => {
  const result = await allProducts.getProducts();
  const salesId = result.map((e) => e.id);
  const checkId = sale.every(({ productId }) => salesId.includes(productId));

  if (!checkId) {
    return { type: 404, message: 'Product not found' };
  }

  const newSales = await salesModel.sales(sale);
  return { type: null, message: newSales };
};

const salesDelete = async (id) => {
  const deleteSales = await salesModel.getSalesById(id);
  if (deleteSales.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }

  await salesModel.salesDelete(id);

  return { type: null };
};

module.exports = {
  sales,
  getSales,
  getSalesById,
  salesDelete,
};
