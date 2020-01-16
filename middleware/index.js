(() => {

    'use strict';

    const bodyParser = require('body-parser');

    const User = require('../models/user.model');
    const Bin = require('../models/bin.model');
    const Location = require('../models/location.model');
    const Council = require('../models/council.model');

    const Routes = require('../routes');
    const Firebase = require('./firebase');

    const init = app => {

        app.use(bodyParser.json());

        // initialize firebase admin
        Firebase();

        // create tables
        User.sync({ force: true, match: /_test$/ });
        Location.sync({ force: true, match: /_test$/ });
        Bin.sync({ force: true, match: /_test$/ });
        
    
        Council.sync({ force: true, match: /_test$/ });

        // init routes
        Routes(app);

    };

    module.exports = init;
})();