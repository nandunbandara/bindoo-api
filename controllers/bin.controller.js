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

    }

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

    module.exports = {
        createNewBin,
        updateBin,
        getBinsByLocation,
        deleteBin
    };

})();