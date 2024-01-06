const express = require('express');
const router = express.Router();
const productControlller = require('../controllers/ProductController')
router.post('/product', productControlller.postProduct);

module.exports = router;