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
    paymentStripe,
}