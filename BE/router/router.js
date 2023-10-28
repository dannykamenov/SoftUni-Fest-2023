const { uploadProduct, getProducts, getProductById, editProduct, updateUser, deleteProduct, getMerchants, searchMerchant, getMerchantById } = require('../controllers/productController');
const { paymentStripe } = require('../controllers/paymentController');


const router = require('express').Router();

router.post('/upload-product', uploadProduct)
router.get('/get-products', getProducts)
router.get('/product/:id', getProductById)
router.put('/product/:id', editProduct)
router.post('/update', updateUser)
router.delete('/product/:id', deleteProduct)
router.get('/merchants', getMerchants)
router.get('/search', searchMerchant)
router.get('/merchant/:id', getMerchantById)
router.post('/create-payment-intent', paymentStripe)

module.exports = router;