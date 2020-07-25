(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');
    const UserController = require('../controllers/user.controller');
    const EmailController = require('../controllers/email.controller');
    const { userSignUpValidator } = require('../util/validators/user.validator');

    const init = app => {

        app.post('/users', userSignUpValidator, RequestLogWrapper(UserController.createNewUser));
        app.put('/users/:uid/stripeToken', RequestLogWrapper(UserController.updateStripeTokenForUser));
        app.get('/users/:uid', RequestLogWrapper(UserController.getUserByUid));
        app.delete('/users/:uid', RequestLogWrapper(UserController.deleteUser));

        // email verification
        app.post('/users/:uid/email', RequestLogWrapper(EmailController.sendVerificationEmailToUser));
        app.put('/users/:uid/email', RequestLogWrapper(EmailController.verifyEmail));


    };

    module.exports = { init };

})();