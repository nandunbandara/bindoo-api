const pickupListController = require('../controllers/pickup-list.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

       app.post('/councils/:councilUid/pickuplists', RequestLogWrapper(pickupListController.createPickupList));
        
    };

    module.exports = { init };

})();