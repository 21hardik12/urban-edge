const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, default: 'user'}
});

userSchema.pre('save', async function(next) {
  try {
    const user = this;
    if (!user.isModified('password')) next();
    const hashedpassword = await bcrypt.hash(user.password, 10);
    this.password = hashedpassword;
    next();
  } catch (err) {
    return next(err);
  }
})

userSchema.methods.matchPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
}


const User = mongoose.model('User', userSchema);
module.exports = User;