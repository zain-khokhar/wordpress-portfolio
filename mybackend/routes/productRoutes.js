// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, deleteProduct, updateProduct } = require('../controllers/productController');

router.post('/admin', createProduct);
router.put('/admin/:id', updateProduct);
router.get('/admin', getAllProducts);
router.delete('/admin/:id', deleteProduct);
module.exports = router;
