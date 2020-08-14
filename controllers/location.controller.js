(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');
    const logger = require('../middleware/logger');
    const LocationRepository = require('../services/repositories/location.repo');

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    const createLocationForUser = async (req, res) => {

        const { name, description, type, tax_id,
            building_number, line_1, line_2, city,
            uid, councilId} = req.body;

        try {

            logger.info(`[SVC] services.controllers.location.createLocationForUser`);
            const result = await LocationRepository.createLocation(
                name, description, type, tax_id,
                building_number, line_1, line_2, city,
                uid, councilId
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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    const getLocationsByUser = async (req, res) => {

        try {

            logger.info(`[SVC] services.controllers.location.getLocationsByUser`);
            const result = await LocationRepository.getLocationsByUserId(req.params.uid);

            return res.status(HTTP_STATUS.CREATED).json({
                success: true, data: result
            });

        } catch (err) {

            logger.error(`[ERROR] services.controllers.location.getLocationsByUser : ${err.message}`);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }
        

    };

    const getAllLocations = async (req, res) => {
        try {
            const result = await LocationRepository.getLocations();
            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getLocationsByCouncil = async (req, res) => {
        try {

            const result = await LocationRepository.getLocationsByCouncil(req.params.id);
            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const updateLocation = async (req, res) => {

        try {

            logger.info('update location init');
            const result = await LocationRepository.updateLocation(
                req.params.id,
                req.body.name, req.body.description, req.body.type,
                req.body.address, req.body.longitude, req.body.latitude
            );

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {
            logger.error(`[ERROR] services.controllers.location.updateLocation : ${err.message}`);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }

    };

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    const verifyLocation = async (req, res) => {

        try {

            logger.info(`[SVC] services.controllers.location.verifyLocation: location ${req.params.id}`);
            const result = await LocationRepository.verifyLocation(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });


        } catch (err) {
            
            logger.error(`[ERROR] services.controllers.location.verifyLocation: ${err.message}`);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }

    };

    module.exports = {
        createLocationForUser,
        getLocationsByUser,
        verifyLocation,
        updateLocation,
        getAllLocations,
        getLocationsByCouncil,
    };

})();