(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');
    const UserController = require('../controllers/user.controller');
    const { userSignUpValidator } = require('../util/validators/user.validator');

    const init = app => {

        app.post('/users', userSignUpValidator, RequestLogWrapper(UserController.createNewUser));

    };

    module.exports = { init }

})();