const Order = require('./order.model');
const { ITEM_STATUS } = require('../services/constants.service');
const OrderItem = require('./order-item.model');

(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Item extends Model {}

    Item.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        photo: DataTypes.STRING,
        status: { type: DataTypes.STRING, default: ITEM_STATUS.AVAILABLE }
    }, { sequelize, modelName: 'item' });

    // Item.belongsToMany(Order, { through: OrderItem });

    module.exports = Item;

})();