const pickupListController = require('../controllers/pickup-list.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

       app.post('/councils/:councilUid/pickuplists', RequestLogWrapper(pickupListController.createPickupList));
       app.get('/councils/:councilUid/pickuplists/date/:date', RequestLogWrapper(pickupListController.getPickupListByCouncilAndDate));
       app.delete('/pickuplists/:id', RequestLogWrapper(pickupListController.deletePickupList))
        
    };

    module.exports = { init };

})();