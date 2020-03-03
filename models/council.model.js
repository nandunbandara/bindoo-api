(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const Location = require('./location.model');
    const sequelize = require('../middleware/database').getConnection();

    class Council extends Model {}

    Council.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        province: DataTypes.INTEGER,
        district: DataTypes.INTEGER,
    }, { sequelize, modelName: 'council' });

    Council.hasMany(Location);

    module.exports = Council;

})();