const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  products: [{
    product: {type: mongoose.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true}
  }],
  total: {type: Number, required: true},
  status: {type: String, default: 'pending'},
  paymentMethod: {type: String, required: true},
  shippingAddress: {
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: String, required: true},
    country: {type: String, required: true},
  },
  createdAt: {type: Date, default: Date.now()}
})

exports.Order = mongoose.model('Order', orderSchema);
