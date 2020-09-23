const RequestLogWrapper = require("../util/loghandler");
const allocationController = require("../controllers/allocation.controller");

const init = app => {
    app.post('/councils/:councilUid/allocations', RequestLogWrapper(allocationController.createAllocation));
    app.get('/councils/:councilUid/allocations/date/:date', RequestLogWrapper(allocationController.getAllocationsByCouncilAndDate));
    app.delete('/pickuplistItems/:pickupListItemId/allocations/:id', RequestLogWrapper(allocationController.removeAllocation));
    app.put('/allocations/:id/status', RequestLogWrapper(allocationController.updateAllocationStatus));
    app.get('/councils/:councilUid/allocations', RequestLogWrapper(allocationController.getVehicleAllocations));
    app.post('/pickuplistItems/:pliId/allocations/:id/complete', RequestLogWrapper(allocationController.completeAllocation));
    app.get('/councils/:councilUid/collections', RequestLogWrapper(allocationController.getAllCollectionsByCouncil));
};

module.exports = {init};