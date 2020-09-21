const httpStatus = require("http-status");
const laneRepo = require("../services/repositories/lane.repo");

const createLane = (req, res) => {

    const { name, councilUid } = req.body;

    if (!name || !councilUid) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Parameters \'name\' and \'councilUid\' required'
        });
    }

    try {
        const result = await laneRepo.createLane(name, councilUid);

        return res.status(httpStatus.CREATED).json({
            success: true, data: result
        })
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }

}

const getLanesByCouncil = (req, res) => {
    
}

const updateLane = (req, res) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).send();
}

const deleteLane = (req, res) => {
    return res.status(httpStatus.NOT_IMPLEMENTED).send();
}

module.exports = {
    createLane,
    getLanesByCouncil,
    updateLane,
    deleteLane
}
