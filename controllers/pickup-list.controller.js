const httpStatus = require("http-status");
const laneRepo = require("../services/repositories/lane.repo");
const pickupListRepo = require("../services/repositories/pickup-list.repo");

const createPickupList = async (req, res) => {
    try {
        const pendingPickups = await laneRepo.getAmountOfGarbageByLanesByCouncil(req.params.councilUid);

        const pickupList = await pickupListRepo.createPickupList(req.params.councilUid);

        const _pickups = pendingPickups[0];

        for(let pickup of _pickups) {
            await pickupListRepo.createPickupListItem(pickupList.id, pickup.id, pickup.total);
        }

        return res.status(httpStatus.CREATED).json({
            success: true, data: pickupList
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const getPickupListByCouncilAndDate = async (req, res) => {
    try {

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
};

module.exports = {
    createPickupList,
    getPickupListByCouncilAndDate
}