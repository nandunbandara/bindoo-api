(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const Item = require('./item.model');
    const sequelize = require('../middleware/database').getConnection();
    const { ORDER_STATUS } = require('../services/constants.service');

    class Order extends Model {}

    Order.init({
        total: DataTypes.NUMBER,
        shippingAddress: DataTypes.STRING,
        status: { type: DataTypes.STRING, defaultValue: ORDER_STATUS.PENDING },
    }, { sequelize, modelName: 'order' });

    module.exports = Order;

})();