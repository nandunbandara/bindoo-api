const laneController = require('../controllers/lane.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');
   
    const init = app => {
        app.post('/lanes', RequestLogWrapper(laneController.createLane));
        app.get('/councils/:id/lanes', RequestLogWrapper(laneController.getLanesByCouncil));
        app.get('/councils/:id/lanes/garbage', RequestLogWrapper(laneController.getAmountofGarabageByLanesByCouncil));
    };

    module.exports = { init };

})();