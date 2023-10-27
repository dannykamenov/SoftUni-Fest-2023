const { uploadProduct, getProducts, getProductById, editProduct, updateUser, deleteProduct, getMerchants, searchMerchant } = require('../controllers/productController');


const router = require('express').Router();

router.post('/upload-product', uploadProduct)
router.get('/get-products', getProducts)
router.get('/product/:id', getProductById)
router.put('/product/:id', editProduct)
router.post('/update', updateUser)
router.delete('/product/:id', deleteProduct)
router.get('/merchants', getMerchants)
router.get('/search', searchMerchant)


module.exports = router;