const councilRoutes = require('./council.routes');
const organizationRoutes = require('./organization.routes');
const vehicleRoutes = require('./vehicle.routes');
const paymentRoutes = require('./payment.routes');
const recyclableItemRoutes = require('./recyclable-item.routes');
const laneRoutes = require('./lane.routes');
const pickupListRoutes = require('./pickup-list.routes');

(() => {

    'use strict';

    const UserRoutes = require('./user.routes');
    const LocationRoutes = require('./location.routes');
    const BinRoutes = require('./bin.routes');

    const init = app => {
        UserRoutes.init(app);
        LocationRoutes.init(app);
        BinRoutes.init(app);
        councilRoutes.init(app);
        organizationRoutes.init(app);
        vehicleRoutes.init(app);
        paymentRoutes.init(app);
        recyclableItemRoutes.init(app);
        laneRoutes.init(app);
        pickupListRoutes.init(app);
    };

    module.exports = init;
    
})();