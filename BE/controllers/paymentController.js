const data = require('../mongodb');
const axios = require('axios');

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

async function paymentCoinbase(req, res) {
    const { title, description, price, user } = req.body.product;
    const {uid, email, displayName} = req.body.user;

    const charge = {
        "name": title,
        "description": description,
        "local_price": {
            "amount": price,
            "currency": "USD"
        },
        "pricing_type": "fixed_price",
        "metadata": {
            "customer_id": uid,
            "customer_name": displayName,
            "customer_email": email,
            "merchant_name": user,
        }
    } 

    const headers = {
            'Content-Type': 'application/json',
            'X-CC-Api-Key': '01603b75-eea1-4ccf-a680-f0693ecbc4b7',
            'X-CC-Version': '2018-03-22',
    };
    

    try {
        const response = await axios.post('https://api.commerce.coinbase.com/charges', charge, {headers});
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: err });
    }

}

module.exports = {
    paymentStripe,
    paymentCoinbase
}