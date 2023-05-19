const productService = require('../services/productsService');

const getProducts = async (_req, res) => {
  const products = await productService.getProducts();
  res.status(200).json(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.getProductsById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const newProducts = async (req, res) => {
  try {
    const { name } = req.body;

    const newProduct = await productService.newProducts({ name });
    return res.status(201).json(newProduct);
  } catch (error) {
    // console.log(error.status);
    return res.status(422).json({ message: error.message });
  }
};

const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productService.productUpdate(id, name);

  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(200).json(message);
};

const productDelete = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.productDelete(id);
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(204).json({ message: 'productDelete' });
};

const getTerm = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  const getAllProducts = await productService.getProducts();
  const getBySearch = await productService.getTerm(q);

  if (!q || q.length === 0) {
    return res.status(200).json(getAllProducts);
  }
  return res.status(200).json(getBySearch);
};

module.exports = {
  getProducts,
  getProductsById,
  newProducts,
  productUpdate,
  productDelete,
  getTerm,
};