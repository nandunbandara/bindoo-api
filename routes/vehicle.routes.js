const vehicleController = require('../controllers/vehicle.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

        app.get('/vehicles/count', RequestLogWrapper(vehicleController.getVehicleCount));
        app.get('/councils/:id/vehicles/count', RequestLogWrapper(vehicleController.getVehicleCountByCouncil));
        app.get('/vehicles', RequestLogWrapper(vehicleController.getAllVehicles));
        app.get('/councils/:id/vehicles', RequestLogWrapper(vehicleController.getVehiclesByCouncil));
        app.post('/vehicles', RequestLogWrapper(vehicleController.createVehicle));
        app.put('/vehicles/:id', RequestLogWrapper(vehicleController.updateVehicle));
        app.delete('/vehicle/:id', RequestLogWrapper(vehicleController.deleteVehicle));
        
    };

    module.exports = { init };

})();