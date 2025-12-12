const jwt = require('jsonwebtoken');
const Admin = require('../model/user.model');
const User = require('../model/user.model');


exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized: No token' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let user;
    switch ((decoded.role || '').toLowerCase()) {
      case 'admin':
        user = await Admin.findById(decoded.id);
        break;
      case 'user':
        user = await User.findById(decoded.id);
        break;
      default:
        return res.status(401).json({ message: 'Invalid role in token' });
    }

    if (!user || user.isDelete) return res.status(401).json({ message: 'Invalid or deleted user' });

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'User not found' });

    const allowedRoles = roles.map(r => r.toLowerCase());
    if (allowedRoles.includes(req.user.role.toLowerCase())) {
      return next();
    }

    return res.status(403).json({ message: 'Invalid Role' });
  };
};
