const recyclableItemController = require('../controllers/recyclable-item.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

        app.get('/recyclable-items', RequestLogWrapper(recyclableItemController.getAllRecyclableItems));
        app.get('/customers/:userUid/recyclable-items', RequestLogWrapper(recyclableItemController.getRecyclableItemsByUser));
        app.get('/councils/:councilUid/recyclable-items', RequestLogWrapper(recyclableItemController.getRecyclableItemsByCouncil));
        app.post('/recyclable-items', RequestLogWrapper(recyclableItemController.createRecycledItem));
        app.put('/recyclable-items/:id/status', RequestLogWrapper(recyclableItemController.updateRecycledItemStatus));
        
    };

    module.exports = { init };

})();