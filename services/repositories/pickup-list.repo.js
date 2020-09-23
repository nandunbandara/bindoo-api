const PickupList = require("../../models/pickup-list.model");
const PickupListItem = require("../../models/pickup-list-item.model.");
const { sequelize } = require("../../models/pickup-list.model");

const createPickupList = (councilUid, date = Date.now()) => PickupList.create({
    date, councilUid
});

const getPickupListByCouncilAndDate = (councilUid, date) => sequelize.query(
    `SELECT p.id as pickListId, p.date, i.id as pickupListItemId, i.status, i.vehicleId, i.allocationId, i.amount, l.id as laneId, l.name ` +  
    `FROM pickup_lists p, pickup_list_items i, lanes l ` + 
    `WHERE p.id = i.pickupListId AND l.id = i.laneId ` + 
    `AND p.councilUid = '${councilUid}' AND p.date = '${date}'`
);

const createPickupListItem = (pickupListId, laneId, amount) => PickupListItem.create({
    pickupListId, laneId, amount
});

const deletePickupList = id => PickupList.destroy({ where: { id }});

const updatePickListItemStatusAndVehicle = (id, status, vehicleId, allocationId) => PickupListItem.update(
    { status, vehicleId, allocationId }, { where: { id }}
);

module.exports = {
    createPickupList,
    getPickupListByCouncilAndDate,
    createPickupListItem,
    deletePickupList,
    updatePickListItemStatusAndVehicle
};