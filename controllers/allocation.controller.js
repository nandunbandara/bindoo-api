const httpStatus = require("http-status")

const createAllocation = (req, res) => {

   const { vehicleId, laneId } = req.body;

    try {
        
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}