const stripe = require('stripe')(require('../config/keys').stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/charge', requireLogin, async (req, res) => {
        try {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                source: req.body.id,
            });
        } catch (err) {
            return res.send({ error: 'Something went wrong with the charge.' });
        }
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};
