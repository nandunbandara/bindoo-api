const httpStatus = require("http-status");
const laneRepo = require("../services/repositories/lane.repo");
const pickupListRepo = require("../services/repositories/pickup-list.repo");
const allocationRepo = require("../services/repositories/allocation.repo");

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
        const date = formatDate(req.params.date);

        const result = await pickupListRepo.getPickupListByCouncilAndDate(req.params.councilUid, date);

        return res.status(httpStatus.OK).json({
            success: true, data: result[0]
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
};

const deletePickupList = async (req, res) => {
    try {
        const result = await pickupListRepo.deletePickupList(req.params.id);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = {
    createPickupList,
    getPickupListByCouncilAndDate,
    deletePickupList
}