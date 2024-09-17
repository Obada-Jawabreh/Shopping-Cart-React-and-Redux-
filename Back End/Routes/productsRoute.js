const express = require('express');
const router = express.Router();
const productController = require('./../Controllers/productsController');

// Get all products
router.get('/get', productController.getAllProducts);

// Create a new product
router.post('/create', productController.createProduct);

// Update a product by ID
router.put('/edit/:id', productController.updateProduct);

// Delete a product by ID
router.delete('/del/:id', productController.deleteProduct);

module.exports = router;
