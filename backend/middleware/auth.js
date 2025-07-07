// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to verify JWT from cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; 

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to allow only admin users
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user?.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Admins only." });
    }
  });
};

module.exports = { verifyToken, verifyAdmin };
