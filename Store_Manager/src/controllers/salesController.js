const salesService = require('../services/salesServices');

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.getSalesById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const sales = async (req, res) => {
  const { type, message } = await salesService.sales(req.body);
  
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json(message);
};

const salesDelete = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.salesDelete(id);
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(204).end();
};

module.exports = {
  sales,
  getSales,
  getSalesById,
  salesDelete,
};