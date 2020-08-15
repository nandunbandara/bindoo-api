const Vehicle = require('./vehicle.model');

(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const Location = require('./location.model');
    const sequelize = require('../middleware/database').getConnection();

    class Council extends Model {}

    Council.init({
        uid: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        email: DataTypes.STRING,
    }, { sequelize, modelName: 'council' });

    Council.hasMany(Location);
    Council.hasMany(Vehicle);

    module.exports = Council;

})();