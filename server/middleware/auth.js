const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'ajaytips_super_secret_jwt_key_2026';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.headers['x-access-token'];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden: Insufficient privileges.' });
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRoles, JWT_SECRET };
