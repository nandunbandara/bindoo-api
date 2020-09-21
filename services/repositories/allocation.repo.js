const Allocation = require("../../models/allocation.model");

const createNewAllocation = (binId, vehicleId, date = new Date()) => Allocation.create({
    binId, vehicleId, date
});

const removeAllocation = id => Allocation.destroy(id);

module.exports = {
    createNewAllocation,
    removeAllocation
};