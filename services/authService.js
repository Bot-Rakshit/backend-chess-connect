const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');

exports.generateToken = (user) => {
  const payload = {
    userId: user.id,
    chesscomId: user.chesscomId,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return token;
};

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};