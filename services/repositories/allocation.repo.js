const Allocation = require("../../models/allocation.model");

const createNewAllocation = (laneId, vehicleId, date = new Date()) => Allocation.create({
    binId, vehicleId, date
});

const removeAllocation = id => Allocation.destroy(id);

const updateAllocationStatus = (id, status) => Allocation.update({ status }, { where: { id }});

const getAllocationsByVehicleAndDate = (vehicleId, date) => Allocation.findAll({ where: { vehicleId, date }});

const getAllAllocationsByVehicle = vehicleId => Allocation.findAll({ where: { vehicleId }});

module.exports = {
    createNewAllocation,
    removeAllocation,
    updateAllocationStatus
};