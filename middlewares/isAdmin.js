const jwt = require('jsonwebtoken');
const COOKIE_NAME = process.env.COOKIE_NAME || 'access_token';

module.exports = (req, res, next) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Jika Anda menggunakan role_id
    if (decoded.role !== 2) {
      return res.status(403).json({ message: 'Forbidden: Admin only' });
    }

    // Atau jika Anda memakai role name:
    // if (decoded.role !== 'admin') { … }

    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
};
