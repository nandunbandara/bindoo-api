const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createSetupIntent = () => stripe.setupIntents.create({
    payment_method_types: ['card']
});

const createCharge = (amount, source, description, currency = 'lkr') => stripe.charges.create({
    amount, currency, source, description
});

const createCustomerWithoutToken = (uid, email) => stripe.customers.create({
    email, description: `Customer with UID: ${uid}`
});

// const createSetupIntent = () => stripe.setupIntents.create();

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