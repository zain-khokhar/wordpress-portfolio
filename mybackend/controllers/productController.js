// controllers/productController.js

const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { image, title, description } = req.body;

    const newProduct = new Product({ image, title, description });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// read all products controller

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// update product controller
const updateProduct = async (req, res) => {
  try {
    const { image, title, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { image, title, description },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createProduct , getAllProducts , deleteProduct };
module.exports = { createProduct, getAllProducts, deleteProduct, updateProduct };
