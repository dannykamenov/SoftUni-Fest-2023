const Product = require('../models/productModel');

function uploadProduct(req, res) {
    const { title, description, price, user, email, uid, photoURL, date } = req.body;
    Product.create({ title, description, price, user, email, uid, photoURL, date })
        .then(product => {
            res.status(201).json(product);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

function getProducts(req, res) {
    const uid = req.params.uid;
}


module.exports = {
    uploadProduct,
    getProducts
}
