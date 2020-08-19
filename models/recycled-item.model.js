(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class RecycledItem extends Model {}

    RecycledItem.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
    }, { sequelize, modelName: 'recycled_item' });

    module.exports = RecycledItem;

})();