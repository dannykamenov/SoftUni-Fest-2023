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
    Product.find({ uid })
        .sort({ date: -1 })
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

function getProductById(req, res) {
    const id = req.params.id;
    Product.findById(id)
        .then(product => {
            res.status(200).json(product);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

async function editProduct(req, res) {
    const id = req.params.id;
    const { title, description, price } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { title, description, price },
        );
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function updateUser(req, res) {
    const { uid, name, photoURL } = req.body;
    try {
        const product = await Product.updateMany(
            { uid },
            { user: name, photoURL },
        );
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(id);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    uploadProduct,
    getProducts,
    getProductById,
    editProduct,
    updateUser,
    deleteProduct
}
