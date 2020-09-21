const User = require('./user.model');
const Organization = require('./organization.model');

(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();
    const { ORDER_STATUS } = require('../services/constants.service');

    class Order extends Model {}

    Order.init({
        total: DataTypes.FLOAT,
        shippingAddress: DataTypes.STRING,
        status: { type: DataTypes.STRING, defaultValue: ORDER_STATUS.PENDING },
    }, { sequelize, modelName: 'order' });

    Order.belongsTo(User);
    Order.belongsTo(Organization);

    User.hasMany(Order);
    Organization.hasMany(Order);

    module.exports = Order;

})();