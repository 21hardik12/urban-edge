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
        const err = new Error('Product not found');
        err.status = 404;
        return next(err);
    }

    res.json(product)
})