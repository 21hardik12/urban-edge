const {asyncHandler } = require('express-async-handler')
const Product = require('./models/Product');


// @desc Get all products
// @route GET /api/products 
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
    res.json(products);
})

// @desc Get product by id
// @route GET /api/products/:id
// @access public
exports.getProductById = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({message: 'Product not found'});
    }

    res.json(product)
})

// @desc create a product
// @route POST /api/products
// @access Private (admin)
exports.createProduct = asyncHandler(async (req, res) => {
    
})

// @desc update a product
// @route PUT /api/products
// @access Private (admin)
exports.updateProduct = asyncHandler(async (req, res) => {
    
})

// @desc delete a product
// @route DELETE /api/products
// @access Private (admin)
exports.deleteProduct = asyncHandler(async (req, res) => {
    
})
