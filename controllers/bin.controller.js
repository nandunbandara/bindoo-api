const httpStatus = require('http-status');
const binRepo = require('../services/repositories/bin.repo');
const { sendEvent } = require('../services/pusher.service');

(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');

    const BinRepository = require('../services/repositories/bin.repo');

    const createNewBin = async (req, res) => {

        try {
    
            const result = await BinRepository.createNewBinForLocation(
                req.body.name, req.body.description, 
                req.body.type, req.body.capacity, req.params.id
            );

            return res.status(HTTP_STATUS.CREATED).json({ success: true, data: result});

        } catch (err) {

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }
        

    };

    const getBinById = async (req, res) => {
        
        try {

            const result = await BinRepository.getBinById(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result.length > 1 ? result[0][0] : {}
            });

        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }

    };

    const getBinByStatus = async (req, res) => {

        try {

            const result = await BinRepository.getBinsByStatus(req.params.status === 'true' ? true : false);

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });
        
        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }

    }

    const updateBin = async (req, res) => {

        try {

            const result = await BinRepository.updateBin(
                req.params.id,
                req.body.name,
                req.body.description,
                req.body.type,
                req.body.capacity
            );

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }

    };

    const getBinsByLocation = async (req, res) => {

        try {

            const result = await BinRepository.getBinsByLocation(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }

    };

    const deleteBin = async (req, res) => {

        try {

            const result = await BinRepository.deleteBin(req.params.id);

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false,
                error: err.message
            });

        }
    };

    const changeBinReadyForCollectionStatus = async (req, res) => {
        
        try {

            const binResult = await BinRepository.getBinById(req.params.id);
            const bin = binResult[0][0];
            if (!bin) { throw new Error('bin not found for provided id'); }


            const status = !bin.readyForCollection;
            
            const result = await BinRepository
                                        .updateReadyForCollectionStatus(req.params.id, status);

            await sendEvent(
                bin.council_uid,
                status ? 'new_ready_for_pickup' : 'bin_ready_for_pickup_cancel',
                bin
            );

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }

    };

    const getBinCountByUser = async (req, res) => {
        try {
            let result = await binRepo.getBinCountByUser(req.params.uid);

            if (result.length && result.length > 0 && result[0].length > 0) {
                result = result[0][0].count;
            }

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getBinsByUser = async (req, res) => {
        try {
            let result = await binRepo.getBinsByUser(req.params.uid);

            if (result.length) {
                result = result[0];
            }

            return res.status(httpStatus.OK).json({
                success: true, data: result
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getBinsByCouncilAndStatus =  async (req, res) => {
        try {
            let result = await binRepo.getBinsByCouncilAndStatus(req.params.councilUid, req.params.status);

            return res.status(httpStatus.OK).json({
                success: true, data: result[0]
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    const getAllBinsByCouncil = async (req, res) => {
        try {
            const result = await binRepo.getBinsByCouncil(req.params.councilUid);

            return res.status(httpStatus.OK).json({
                success: true, data: result[0]
            });
        } catch (err) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    module.exports = {
        createNewBin,
        getBinById,
        getBinByStatus,
        updateBin,
        getBinsByLocation,
        deleteBin,
        changeBinReadyForCollectionStatus,
        getBinCountByUser,
        getBinsByUser,
        getBinsByCouncilAndStatus,
        getAllBinsByCouncil
    };

})();