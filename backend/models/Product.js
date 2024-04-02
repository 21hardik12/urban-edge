const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
  url: String,
  title: String,
  asin: String,
  price: String,
  brand: String,
  product_details: {type: String},
  breadcrumbs: String,
  images_list: [String],
  features: [{
    name: String,
    value: String
  }]
});

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
