const express = require('express');
const verifyus = require('../utils/verify');
const productController = require('../controller/product');
const router = express.Router();

router.post('/product',verifyus,productController.createProduct);

router.get('/product',verifyus,productController.getProduct);

router.get('/productejs',productController.getProductejs);

router.get('/displaydata',productController.displaydata);





module.exports = router;