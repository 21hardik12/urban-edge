const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../config/passport');
const User = require('../models/User');

router.get('/',passport.authenticate('jwt', {session: false}), userController.isAdmin,async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;