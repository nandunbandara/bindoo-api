(() => {

    'use strict';

    const UserRoutes = require('./user.routes');
    const LocationRoutes = require('./location.routes');

    const init = app => {
        UserRoutes.init(app);
        LocationRoutes.init(app);
    };

    module.exports = init;
    
})();