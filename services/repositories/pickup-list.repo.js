const PickupList = require("../../models/pickup-list.model");
const PickupListItem = require("../../models/pickup-list-item.model.");

const createPickupList = (councilUid, date = Date.now()) => PickupList.create({
    date, councilUid
});

const getPickupListByCouncilAndDate = (councilUid, date) => PickupList.findAll({
    where: { date, councilUid }
});

const createPickupListItem = (pickupListId, laneId, amount) => PickupListItem.create({
    pickupListId, laneId, amount
});

module.exports = {
    createPickupList,
    getPickupListByCouncilAndDate,
    createPickupListItem
};