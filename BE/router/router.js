const { uploadProduct } = require('../controllers/productController');


const router = require('express').Router();

router.post('/upload-product', uploadProduct)


module.exports = router;