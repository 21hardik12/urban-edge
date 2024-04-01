const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  url: {type: String, required: true},
  title: {type: String, required: true},
  asin: {type: String, required: true},
  price: {type: String, required: true},
  brand: {type: String, required: true},
  product_details: {type: String, required: true},
  breadcrumbs: [{type: String}],
  image_list: [{type: String}],
  features: [{type: string}]
})

exports.Product = mongoose.model('Product', productSchema);