(() => {

    'use strict';

    const Bin = require('../models/bin.model');
    const Location = require('../models/location.model');

    const init = app => {


        // create tables
        Bin.sync();
        Location.sync();
        
    };

    module.exports = init;
})();