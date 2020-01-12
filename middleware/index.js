(() => {

    'use strict';

    const Bin = require('../models/bin.model');

    const init = app => {


        Bin.sync();
        
    };

    module.exports = init;
})();