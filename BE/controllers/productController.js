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
    const uid = req.query.uid;
    console.log(uid)
    Product.find({ uid })
        .sort({ date: -1 })
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}


module.exports = {
    uploadProduct,
    getProducts
}
