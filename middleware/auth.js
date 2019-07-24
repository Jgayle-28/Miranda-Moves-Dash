const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If token verify token
  try {
    // verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // take user out of decoded
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
