const express = require('express');
const salesController = require('../controllers/salesController');
const { salesError } = require('../middlewares/salesValidation');

const router = express.Router();

router.get('/sales', salesController.getSales);
router.get('/sales/:id', salesController.getSalesById);
router.post('/sales', salesError, salesController.sales);
router.delete('/sales/:id', salesController.salesDelete);

module.exports = router;