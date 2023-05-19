const express = require('express');
const productsController = require('../controllers/productsController');
const { haveName } = require('../middlewares/nameError');

const router = express.Router();

router.get('/products/search', productsController.getTerm);
router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductsById);
router.post('/products', haveName, productsController.newProducts);
router.put('/products/:id', haveName, productsController.productUpdate);
router.delete('/products/:id', productsController.productDelete);

module.exports = router;