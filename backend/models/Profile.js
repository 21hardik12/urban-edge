const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {type: mongoose.Types.ObjectId, ref: 'User'},
  address: {
    street: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String},
    country: {type: String},
  },
  orders: [{type: mongoose.Types.ObjectId, ref: 'Order'}]
}) 

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;