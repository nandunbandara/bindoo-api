(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');
    const LocationController = require('../controllers/location.controller');
    // const { userSignUpValidator } = require('../util/validators/user.validator');

    const init = app => {

        app.post('/users/:uid/locations', RequestLogWrapper(LocationController.createLocationForUser));

    };

    module.exports = { init };

})();