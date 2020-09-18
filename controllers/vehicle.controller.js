const httpStatus = require("http-status");
const vehicleRepo = require("../services/repositories/vehicle.repo");

const createVehicle = async (req, res) => {

    const { registration_number, model, make, capacity, councilUid } = req.body;

    if (!registration_number || !model || !make || !capacity || !councilUid) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameters'
        });
    }

    try {

        const result = await vehicleRepo.createVehicle(
            registration_number,
            model,
            make, 
            capacity,
            councilUid
        );

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const updateVehicle = async (req, res) => {
    try {
        const result = await vehicleRepo.updateVehicle(req.params.id,
            req.body.registration_number,
            req.body.model,
            req.body.make, req.body.capacity
        );

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicleRepo.deleteVehicle(req.params.id);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const getVehiclesByCouncil = async (req, res) => {
    try {
        const result = await vehicleRepo.getVehiclesByCouncil(req.params.id);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
}

const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicleRepo.getAllVehicles();
        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const getVehicleCountByCouncil = async (req, res) => {
    try {

        const data = await vehicleRepo.getVehiclesCountByCouncil(req.params.id);

        return res.status(httpStatus.OK).json({
            success: true, data
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
}

const getVehicleCount = async (req, res) => {
    try {
        const data = await vehicleRepo.getVehiclesCount();

        return res.status(httpStatus.OK).json({
            success: true, data
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}



module.exports = {
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehiclesByCouncil,
    getAllVehicles,
    getVehicleCountByCouncil,
    getVehicleCount,
}