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
        image: DataTypes.STRING,
    }, { sequelize, modelName: 'item' });

    module.exports = Item;

})();