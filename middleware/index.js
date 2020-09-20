const Token = require('../models/token.model');
const Order = require('../models/order.model');
const Allocation = require('../models/allocation.model');

(() => {

    'use strict';

    const bodyParser = require('body-parser');
    const cors = require('cors');

    const User = require('../models/user.model');
    const Bin = require('../models/bin.model');
    const Location = require('../models/location.model');
    const Council = require('../models/council.model');
    const Item  = require('../models/item.model');
    const Vehicle = require('../models/vehicle.model');
    // const Order = require('../models/order.model');
    const Organization = require('../models/organization.model');
    const RecyclableItem = require('../models/recyclable-item.model');

    const Routes = require('../routes');
    const Firebase = require('./firebase');

    const init = async app => {

        app.use(bodyParser.json());
        app.use(cors());

        // initialize firebase admin
        Firebase();

        // create tables
        await User.sync({});
        await Council.sync({});
        await Location.sync({});
        await Bin.sync({});
        await Token.sync({});
        await Item.sync({});
        await Vehicle.sync({});
        // await Order.sync({});
        await Organization.sync({});
        await RecyclableItem.sync({});
        await Order.sync({});
        await Allocation.sync({});

        // init routes
        Routes(app);

    };

    module.exports = init;
})();