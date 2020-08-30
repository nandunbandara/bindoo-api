const paymentController = require('../controllers/payment.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

        app.get('/client_secret', RequestLogWrapper(paymentController.getSetupIntentClientSecret));
        app.post('/customers', RequestLogWrapper(paymentController.createCustomerWithoutToken));
        app.put('/customers/payment_method', RequestLogWrapper(paymentController.attachPaymentMethodToCustomer));
        
    };

    module.exports = { init };

})();