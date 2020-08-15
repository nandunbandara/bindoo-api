const organizationController = require('../controllers/organization.controller');

(() => {

    'use strict';

    const RequestLogWrapper =require('../util/loghandler');

    const init = app => {

        app.get('/organizations', RequestLogWrapper(organizationController.getAllOrganizations));
        app.post('/organizations', RequestLogWrapper(organizationController.createOrganization));
        app.put('/organizations/:uid', RequestLogWrapper(organizationController.updateOrganization));
        app.delete('/organizations/:uid', RequestLogWrapper(organizationController.deleteOrganization));
        
    };

    module.exports = { init };

})();