const Organization = require('./organization.model');
const { RECYCLED_ITEM_STATUS } = require('../services/constants.service');
(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class RecyclableItem extends Model {}

    RecyclableItem.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: { 
            type: DataTypes.STRING, 
            defaultValue: RECYCLED_ITEM_STATUS.PENDING_PICKUP 
        },
        photo: DataTypes.STRING,
    }, { sequelize, modelName: 'recyclable_items' });

    Organization.hasMany(RecyclableItem);

    module.exports = RecyclableItem;

})();