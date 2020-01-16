(() => {

    'use strict';
    
    const HTTP_STATUS = require('http-status');

    const logger = require('../middleware/logger');

    const RequestLogWrapper = requestHandler => (req, res) => {

        try {

            logger.info(`[ENDPOINT] service.endpoint | METHOD: ${req.method} | URL: ${req.url}`);
            requestHandler(req, res);

        } catch (err) {

            logger.error(`[ERROR] service.endpoint ${req.url}: ${err.message}`);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }

    };

    module.exports = RequestLogWrapper;

})();