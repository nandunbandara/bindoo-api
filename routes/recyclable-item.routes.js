const recyclableItemController = require('../controllers/recyclable-item.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

        app.post('/recyclable-items', RequestLogWrapper(recyclableItemController.createRecycledItem));
        app.put('/recyclable-items/:id/status', RequestLogWrapper(recyclableItemController.updateRecycledItemStatus));
        
    };

    module.exports = { init };

})();