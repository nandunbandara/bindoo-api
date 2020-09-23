const httpStatus = require("http-status");
const allocationRepo = require("../services/repositories/allocation.repo");
const { ALLOCATION_STATUS } = require("../services/constants.service");

const createAllocation = async (req, res) => {
    const { laneId, vehicleId } = req.body;

    if (!laneId || !vehicleId || !amount) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Parameters \'laneId\' and \'vehicleId\' are required'
        });
    }

    try {
        const allocation = await allocationRepo.createNewAllocation(req.params.councilUid, laneId, vehicleId, amount);

        return res.status(httpStatus.CREATED).json({
            success: true, data: allocation
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const getAllocationsByCouncilAndDate = async (req, res) => {
    try {
        const result = await allocationRepo.getAllAllocationsByDateAndCouncil(req.params.date, req.params.councilUid);

        return res.status(httpStatus.OK).json({
            success: true, data: result[0]
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const updateAllocationStatus = async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Parameter \'status\' is required'
        });
    }

    if (!Object.values(ALLOCATION_STATUS).includes(status)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameter \'status\'',
            data: {
                required: Object.values(ALLOCATION_STATUS),
                received: status
            }
        });
    }

    try {
        const result = await allocationRepo.updateAllocationStatus(req.params.id, status);
        
        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const removeAllocation = async (req, res) => {
    try {
        const result = await allocationRepo.removeAllocation(req.params.id);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const getVehicleAllocations = async (req, res) => {
    try {
        const result = await allocationRepo.getVehicleAllocations(req.params.councilUid);

        return res.status(httpStatus.OK).json({
            success: true, data: result[0]
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
};

module.exports = {
    createAllocation,
    updateAllocationStatus,
    removeAllocation,
    getAllocationsByCouncilAndDate,
    getVehicleAllocations
};