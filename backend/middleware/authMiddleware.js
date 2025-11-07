// // exports.authenticate = (req, res, next) => {
// //   // Add your authentication logic here
// //   // For example, verify a token
// //   const token = req.header('Authorization');

// //   if (!token) {
// //     return res.status(401).send('Access denied. No token provided.');
// //   }

// //   try {
// //     // Verify token
// //     // const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     // req.user = decoded;
// //     next();
// //   } catch (ex) {
// //     res.status(400).send('Invalid token.');
// //   }
// // };



// // // middleware/authMiddleware.js
// // const jwt = require('jsonwebtoken');

// // exports.authenticate = (req, res, next) => {
// //   const authHeader = req.headers.authorization;

// //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
// //     return res.status(401).json({ message: 'Access denied. No token provided.' });
// //   }

// //   const token = authHeader.split(' ')[1];

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ message: 'Invalid token.' });
// //   }
// // };



// const jwt = require('jsonwebtoken');

// /**
//  * Middleware to authenticate user using JWT.
//  * Attaches decoded user payload to req.user.
//  */
// exports.authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access denied. No authorization header provided.'
//     });
//   }

//   if (!authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access denied. Invalid token format. Use "Bearer <token>".'
//     });
//   }

//   const token = authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: 'Access denied. No token provided.'
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = {
//       userId: decoded.userId,
//       email: decoded.email,
//       role: decoded.role || 'user', // default role = user
//     };

//     next();
//   } catch (err) {
//     let message = 'Authentication failed. Please log in again.';

//     if (err.name === 'TokenExpiredError') {
//       message = 'Token expired. Please log in again.';
//     } else if (err.name === 'JsonWebTokenError') {
//       message = 'Invalid token. Please log in again.';
//     }

//     return res.status(401).json({ success: false, message });
//   }
// };

// /**
//  * Role-based access middleware.
//  * Pass allowed roles as arguments → e.g. authorizeRoles('admin', 'seller')
//  */
// exports.authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Authentication required.'
//       });
//     }

//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({
//         success: false,
//         message: `Access denied. Allowed roles: ${allowedRoles.join(', ')}`
//       });
//     }

//     next();
//   };
// };


const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate user using JWT.
 * Attaches decoded user payload to req.user.
 */
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if authorization header exists
  if (!authHeader) {
    console.error('No authorization header provided');
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authorization header provided.'
    });
  }

  // 2. Check if token format is correct
  if (!authHeader.startsWith('Bearer ')) {
    console.error('Invalid token format. Use "Bearer <token>"');
    return res.status(401).json({
      success: false,
      message: 'Access denied. Invalid token format. Use "Bearer <token>".'
    });
  }

  // 3. Extract token
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.error('No token provided');
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user to request
    req.user = {
      userId: decoded.userId || decoded.id, // Support both userId and id
      email: decoded.email,
      role: decoded.role || 'user', // Default role = user
    };

    // 6. Log for debugging
    console.log('Authenticated User:', {
      userId: req.user.userId,
      email: req.user.email,
      role: req.user.role
    });

    // 7. Proceed to next middleware
    next();
  } catch (err) {
    // 8. Handle JWT errors
    let message = 'Authentication failed. Please log in again.';
    if (err.name === 'TokenExpiredError') {
      message = 'Token expired. Please log in again.';
      console.error('Token expired:', err.message);
    } else if (err.name === 'JsonWebTokenError') {
      message = 'Invalid token. Please log in again.';
      console.error('Invalid token:', err.message);
    } else {
      console.error('Authentication error:', err.message);
    }

    return res.status(401).json({ success: false, message });
  }
};

/**
 * Role-based access middleware.
 * Pass allowed roles as arguments → e.g., authorizeRoles('admin', 'seller')
 */
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Check if user is authenticated
    if (!req.user) {
      console.error('Authentication required for role-based access');
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    // 2. Check if user has an allowed role
    if (!allowedRoles.includes(req.user.role)) {
      console.error(`Access denied for user ${req.user.userId}. Allowed roles: ${allowedRoles.join(', ')}`);
      return res.status(403).json({
        success: false,
        message: `Access denied. Allowed roles: ${allowedRoles.join(', ')}`
      });
    }

    // 3. Proceed to next middleware
    next();
  };
};
