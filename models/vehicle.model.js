(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const Council = require('./council.model');
    const sequelize = require('../middleware/database').getConnection();

    class Vehicle extends Model {}

    Vehicle.init({
        uid: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        email: DataTypes.STRING,
    }, { sequelize, modelName: 'vehicle' });

    Vehicle.hasOne(Council);

    module.exports = Vehicle;

})();