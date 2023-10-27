const { uploadProduct, getProducts } = require('../controllers/productController');


const router = require('express').Router();

router.post('/upload-product', uploadProduct)
router.get('/get-products', getProducts)


module.exports = router;