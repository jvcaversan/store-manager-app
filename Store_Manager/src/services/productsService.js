const Joi = require('joi');
const productsModel = require('../models/productsModel');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const getProducts = async () => {
  const products = await productsModel.getProducts();
  return products;
};

const getProductsById = async (id) => {
  const products = await productsModel.getProductsById(id);
  if (!products) return { type: 404, message: 'Product not found' };

  return { type: null, message: products };
};
// const funcaoError = (status, message) => ({ status, message });

const newProducts = async ({ name }) => {
  const { error } = productsSchema.validate({ name });
  // if (error) throw funcaoError(422, error.message);
  if (error) throw new Error(error.message);

  const id = await productsModel.newProducts({ name });
  return { id, name }; 
};

const productUpdate = async (id, name) => {
  const products = await productsModel.getProductsById(id);
  if (!products) {
    return { type: 404, message: 'Product not found' };
  }
  await productsModel.productUpdate(id, name);

  const update = await productsModel.getProductsById(id);

  return { type: null, message: update };
};

const productDelete = async (id) => {
  const products = await productsModel.getProductsById(id);
  if (!products) {
    return { type: 404, message: 'Product not found' };
  }

  await productsModel.productDelete(id);

  return { type: null };
};

const getTerm = async (name) => {
  const products = await productsModel.getTerm(name);
  return products;
};

module.exports = {
  getProducts,
  getProductsById,
  newProducts,
  productUpdate,
  productDelete,
  getTerm,
};