const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';

const authenticate = (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // bisa akses id/email di req.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token tidak valid.' });
  }
};

module.exports = authenticate;
