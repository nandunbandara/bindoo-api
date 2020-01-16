(() => {

    'use strict';

    const UserRoutes = require('./user.routes');

    const init = app => {
        UserRoutes.init(app);
    };

    module.exports = init;
    
})();