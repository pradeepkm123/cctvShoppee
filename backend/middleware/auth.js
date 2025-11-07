// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ success: false, message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { userId: decoded.userId }; // ✅ Match this to the token
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// };





const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ensure `decoded` contains `id`
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

