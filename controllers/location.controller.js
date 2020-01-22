(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');
    const logger = require('../middleware/logger');
    const LocationRepository = require('../services/repositories/location.repo');

    const createLocationForUser = async (req, res) => {

        try {

            logger.info(`[SVC] services.controllers.location.createLocationForUser`);
            const result = await LocationRepository.createLocation(
                req.body.name, req.body.description, req.body.type,
                req.body.address, req.body.longitude, req.body.latitude, req.params.uid
            );

            return res.status(HTTP_STATUS.CREATED).json({
                success: true, data: result
            });

        } catch (err) {

            logger.error(`[ERROR] services.controllers.location.createLocationForUser : ${err.message}`);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }
    };

    module.exports = {
        createLocationForUser
    };

})();