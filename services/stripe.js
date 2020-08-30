const httpStatus = require('http-status');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = () => stripe.setupIntents.create({
    paymemt_method_types: ['cards']
});

const createCharge = (amount, source, description, currency = 'lkr') => stripe.charges.create({
    amount, currency, source, description
});

const createCustomerWithoutToken = (uid, email) => stripe.customers.create({
    email, description: `Customer with UID: ${req.body.uid}`
});

const createSetupIntent = () => stripe.setupIntents.create();

const attachPaymentMethodToCustomer = (customerId, paymentMethodId) => stripe.paymentMethods.attach(
    paymentMethodId,
    {
        customer: customerId
    }
);


module.exports = {
    createSetupIntent,
    createCharge,
    createCustomerWithoutToken,
    createSetupIntent,
    attachPaymentMethodToCustomer
}