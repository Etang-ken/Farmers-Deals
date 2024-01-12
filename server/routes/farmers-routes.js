const express = require('express');
const router = express.Router();
const productControlller = require('../controllers/ProductController')
const userController = require('../controllers/auth/FarmerController')
const secretKey = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//   const token = req.headers['authorization'];

//   if (token == null) {
//     return res.status(401).json({ message: 'Unauthorized: Missing token' });
//   }

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: 'Unauthorized: Invalid token', error: err });
//     }
//     req.user = user;
//     next();
//   });
// }
function verifyJwtToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Replace with your actual secret key
    req.user = decoded; // Attach decoded user data to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/product', verifyJwtToken, productControlller.postProduct);

module.exports = router;