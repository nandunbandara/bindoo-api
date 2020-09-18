const httpStatus = require('http-status');
const { sendEvent } = require('../services/pusher.service');

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
            councilId} = req.body;

        try {

            logger.info(`[SVC] services.controllers.location.createLocationForUser`);
            const result = await LocationRepository.createLocation(
                name, description, type, tax_id,
                building_number, line_1, line_2, city,
                req.params.uid, councilId
            );

            // send update to council
            await sendEvent(councilId, 'new-location', result);

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

    const getLocationsByUserAndStatus = async (req, res) => {
        try {
            const result = await LocationRepository.getLocationsByUserAndStatus(req.params.uid, req.params.verified === 'true' ? true : false);

            return res.status(httpStatus.OK).json({
                success: true, data: result
            })
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getLocationsByCouncilAndStatus = async (req, res) => {
        try {
            const result = await LocationRepository.getLocationByCouncilAndStatus(req.params.councilUid, req.params.verified === 'true' ? true : false);

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const updateLocation = async (req, res) => {

        const { name, description, type, tax_id,
            building_number, line_1, line_2, city,
            uid, councilUid} = req.body;

        try {

            logger.info('update location init');
            const result = await LocationRepository.updateLocation(
                req.params.id, name, description, type, tax_id,
                building_number, line_1, line_2, city,
                uid, councilUid
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

            const location = await LocationRepository.getLocationById(req.params.id);

            logger.info(`[SVC] services.controllers.location.verifyLocation: location ${req.params.id}`);
            const result = await LocationRepository.verifyLocation(req.params.id);

            await sendEvent(location.userUid, 'location_verified', location);

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

    const deleteLocation = async (req, res) => {
        try {
            const result = await LocationRepository.deleteLocation(req.params.id);

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getLocationCount = async (req, res) => {
        try {
            const result = await LocationRepository.getLocationsCount();

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getLocationCountByCouncil = async (req, res) => {
        try {
            const result = await LocationRepository.getLocationCountByCouncil(req.params.id);

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getPVLocationCount = async (req, res) => {
        try {
            const result = await LocationRepository.getPVLocationsCount();

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            })
        }
    }

    const getPVLocationCountByCouncil = async (req, res) => {
        try {
            const result = await LocationRepository.getPVLocationsByCouncilCount(req.params.id);

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getLocationCountByUser = async (req, res) => {
        try {
            const result = await LocationRepository.getLocationCountByUser(req.params.uid);

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const updateStatus = async (req, res) => {
        try {
            const location = await LocationRepository.getLocationById(req.params.id);

            const result = await LocationRepository.updateLocationStatus(req.params.id, req.body.status);

            await sendEvent(location.userUid, 'location_suspended');

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
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
        getLocationsByUserAndStatus,
        getLocationsByCouncilAndStatus,
        deleteLocation,
        getLocationCount,
        getLocationCountByCouncil,
        getPVLocationCount,
        getPVLocationCountByCouncil,
        getLocationCountByUser,
        updateStatus
    };

})();