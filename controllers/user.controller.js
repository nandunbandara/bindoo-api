(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');

    const logger = require('../middleware/logger');

    const createNewUser = (req, res) => {

        try {

            logger.info('[INIT] services.controllers.users.createNewUser');

            return res.status(HTTP_STATUS.CREATED).json({
                success: true, data: {}
            });

        } catch (err) {

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }

    };

    module.exports = {
        createNewUser,
    };

})();