// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send('Invalid token.');
//   }
// };

// // Register a new user
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, mobileNo, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, mobileNo, password: hashedPassword });
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   try {
//     const { mobileNo, password } = req.body;
//     const user = await User.findOne({ mobileNo });
//     if (!user) {
//       return res.status(400).send('Invalid mobile number or password');
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).send('Invalid mobile number or password');
//     }
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
//     res.status(200).json({ token, userId: user._id });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');


// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (ex) {
//     res.status(400).send('Invalid token.');
//   }
// };

// // Register a new user
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, mobileNo, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, mobileNo, password: hashedPassword });
//     await user.save();
//     res.status(201).send('User registered successfully');
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   try {
//     const { mobileNo, password } = req.body;
//     const user = await User.findOne({ mobileNo });
//     if (!user) {
//       return res.status(400).send('Invalid mobile number or password');
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).send('Invalid mobile number or password');
//     }
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
//     res.status(200).json({ token, userId: user._id });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// module.exports = router;






const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

