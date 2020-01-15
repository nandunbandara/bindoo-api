(() => {

    'use strict';

    const bodyParser = require('body-parser');

    const Bin = require('../models/bin.model');
    const Location = require('../models/location.model');
    const Council = require('../models/council.model');

    const Routes = require('../routes');

    const init = app => {

        app.use(bodyParser.json());


        // create tables
        Bin.sync();
        Location.sync();

        Council.sync();

        // init routes
        Routes(app);

    };

    module.exports = init;
})();