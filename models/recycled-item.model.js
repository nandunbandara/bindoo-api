const Organization = require('./organization.model');
const { RECYCLED_ITEM_STATUS } = require('../services/constants.service');
(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class RecycledItem extends Model {}

    RecycledItem.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: { 
            type: DataTypes.STRING, 
            defaultValue: RECYCLED_ITEM_STATUS.PENDING_PICKUP 
        },
        photo: DataTypes.STRING,
    }, { sequelize, modelName: 'recycled_item' });

    RecycledItem.associate = models => {
        RecycledItem.belongsTo(models.user, { foreignKey: 'uid', as: 'user'});
        RecycledItem.belongs(models.organization);
    };

    module.exports = RecycledItem;

})();