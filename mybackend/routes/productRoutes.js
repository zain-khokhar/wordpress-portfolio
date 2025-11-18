// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const { getAllProducts } = require('../controllers/productController');
const { deleteProduct } = require('../controllers/productController');

router.post('/admin', createProduct);
router.get('/admin', getAllProducts);
router.get('/products', getAllProducts);
router.delete('/admin/:id', deleteProduct);
module.exports = router;
