const Allocation = require("../../models/allocation.model");
const { sequelize } = require("../../models/allocation.model");

const createNewAllocation = (councilUid, laneId, vehicleId, amount, date = new Date()) => Allocation.create({
    councilUid, laneId, vehicleId, date, amount
});

const removeAllocation = id => Allocation.destroy(id);

const updateAllocationStatus = (id, status) => Allocation.update({ status }, { where: { id }});

const getAllocationsByVehicleAndDate = (vehicleId, date) => Allocation.findAll({ where: { vehicleId, date }});

const getAllAllocationsByVehicle = vehicleId => Allocation.findAll({ where: { vehicleId }});

const getAllAllocationsByDateAndCouncil = (date, councilUid) => sequelize.query(
    `SELECT * FROM allocations a, vehicles v, lanes l ` + 
    `WHERE a.laneId = l.id AND a.vehicleId = v.id ` +
    `AND a.date = '${date}' AND a.councilUid = '${councilUid}'`
);

const getVehicleAllocations = councilUid => sequelize.query(
    `select distinct v.id, v.registration_number, v.model, v.make, v.capacity, 
    coalesce(sum(a.amount), 0) as allocated_amount, (capacity - coalesce(sum(a.amount), 0)) as available
    from vehicles v left join allocations a on a.vehicleId = v.id
    where v.councilUid = '${councilUid}'
    group by v.id`
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