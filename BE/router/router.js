const { uploadProduct, getProducts, getProductById } = require('../controllers/productController');


const router = require('express').Router();

router.post('/upload-product', uploadProduct)
router.get('/get-products', getProducts)
router.get('/product/:id', getProductById)


module.exports = router;