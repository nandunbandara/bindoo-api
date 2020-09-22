const Token = require('../models/token.model');
const Order = require('../models/order.model');
const Allocation = require('../models/allocation.model');
const OrderItem = require('../models/order-item.model');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('../models/user.model');
const Bin = require('../models/bin.model');
const Location = require('../models/location.model');
const Lane = require('../models/lane.model');
const Council = require('../models/council.model');
const Item  = require('../models/item.model');
const Vehicle = require('../models/vehicle.model');
// const Order = require('../models/order.model');
const Organization = require('../models/organization.model');
const RecyclableItem = require('../models/recyclable-item.model');

const Routes = require('../routes');
const Firebase = require('./firebase');
const Invoice = require('../models/invoice.model');
const Collection = require('../models/collection.model');
const PickupList = require('../models/pickup-list.model');
const PickupListItem = require('../models/pickup-list-item.model.');

(() => {

    'use strict';

    const init = async app => {

        app.use(bodyParser.json());
        app.use(cors());

        // initialize firebase admin
        Firebase();

        // create tables
        await User.sync({});
        await Lane.sync({});
        await Location.sync({});
        await Bin.sync({});
        await Token.sync({});
        
        await Council.sync({});
        await Vehicle.sync({});
        await Organization.sync({});
        await RecyclableItem.sync({});
        await Allocation.sync({});
        await Collection.sync({});
        await PickupList.sync({});
        await PickupListItem.sync({});

        await Order.sync({});
        await Item.sync({});
        await OrderItem.sync({});
        await Invoice.sync({});

        // init routes
        Routes(app);

    };

    module.exports = init;
})();