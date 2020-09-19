const Order = require('./order.model');

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
        status: DataTypes.STRING, // available, sold out
    }, { sequelize, modelName: 'item' });

    Order.hasMany(Item);

    module.exports = Item;

})();