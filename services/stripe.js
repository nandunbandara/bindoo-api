const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = () => stripe.setupIntents.create({
    paymemt_method_types: ['cards']
});

const createCharge = (amount, source, description, currency = 'lkr') => stripe.charges.create({
    amount, currency, source, description
});

module.exports = {
    createSetupIntent,
    createCharge
}