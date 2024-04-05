// authentication and autherization using passport
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

// helper function to check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  next();
};

// @desc Register a user
// @route POST /api/users/register
// @access Public
exports.registerUser = async (req, res, next) => {
  passport.authenticate(
    "local-signup",
    { session: false },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, user });
    }
  )(req, res, next);
};

// @desc Login a user
// @route POST /api/users/login
// @access Public
exports.loginUser = async (req, res, next) => {
  passport.authenticate(
    "local-login",
    { session: false },
    (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ message: info.message });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, user });
    }
  )(req, res, next);
};
