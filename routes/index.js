(() => {

    'use strict';

    const UserRoutes = require('./user.routes');
    const LocationRoutes = require('./location.routes');
    const BinRoutes = require('./bin.routes');

    const init = app => {
        UserRoutes.init(app);
        LocationRoutes.init(app);
        BinRoutes.init(app);
    };

    module.exports = init;
    
})();