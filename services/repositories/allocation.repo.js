const Allocation = require("../../models/allocation.model");
const { sequelize } = require("../../models/allocation.model");

const createNewAllocation = (councilUid, laneId, vehicleId, amount, date = new Date()) => Allocation.create({
    councilUid, laneId, vehicleId, date, amount
});

const removeAllocation = id => Allocation.destroy({ where: {id}});

const updateAllocationStatus = (id, status) => Allocation.update({ status }, { where: { id }});

const getAllocationsByVehicleAndDate = (vehicleId, date) => Allocation.findAll({ where: { vehicleId, date }});

const getAllAllocationsByVehicle = vehicleId => Allocation.findAll({ where: { vehicleId }});

const getAllAllocationsByDateAndCouncil = (date, councilUid) => sequelize.query(
    `SELECT * FROM allocations a, vehicles v, lanes l ` + 
    `WHERE a.laneId = l.id AND a.vehicleId = v.id ` +
    `AND a.date = '${date}' AND a.councilUid = '${councilUid}'`
);

const getVehicleAllocations = councilUid => sequelize.query(
    `SELECT v.id, v.registration_number, v.model, v.make, v.capacity, 
    COALESCE(SUM(a.amount), 0) as allocated_amount, (capacity - COALESCE(SUM(a.amount), 0)) as available
    FROM vehicles v LEFT JOIN allocations a on a.vehicleId = v.id
    WHERE v.councilUid = '${councilUid}' AND a.status = 'pending' OR a.status IS NULL 
    GROUP BY v.id`
);

module.exports = {
    createNewAllocation,
    removeAllocation,
    updateAllocationStatus,
    getAllocationsByVehicleAndDate,
    getAllAllocationsByVehicle,
    getAllAllocationsByDateAndCouncil,
    getVehicleAllocations,
};