const Product = require('../models/productModel');
const data = require('../mongodb');

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

async function getMerchants(req, res) {
    try {
        const merchants = await Product.find().distinct('user');
        let products = [];
        for(let merchant of merchants) {
            const product = await Product.findOne({ user: merchant });
            products.push(product);
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function searchMerchant(req, res) {
    const search = req.query.searchTerm;
    try {
        const merchants = await Product.find({ user: { $regex: search, $options: 'i' } }).distinct('user');
        let products = [];
        for(let merchant of merchants) {
            const product = await Product.findOne({ user: merchant });
            products.push(product);
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function getMerchantById(req, res) {
    const id = req.params.id;
    try {
        const merchantAllProducts = await Product.find({ uid: id });
        res.status(200).json(merchantAllProducts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

async function paymentStripe(req, res) {
    const stripe = require('stripe')(`${data.secretKey}`);
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
        });
        res.status(200).json(paymentIntent);
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
    deleteProduct,
    getMerchants,
    searchMerchant,
    getMerchantById,
    paymentStripe
}
