const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  address: {
    street: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    country: {type: String},
  },
  orders: [{type: mongoose.Types.ObjectId, ref: 'Order'}]
}) 

exports.User = mongoose.model('User', userSchema);