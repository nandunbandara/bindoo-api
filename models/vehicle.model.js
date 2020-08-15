(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const Council = require('./council.model');
    const sequelize = require('../middleware/database').getConnection();

    class Vehicle extends Model {}

    Vehicle.init({
        registration_number: DataTypes.STRING,
        model: DataTypes.STRING,
        make: DataTypes.STRING,
        capacity: DataTypes.FLOAT
    }, { sequelize, modelName: 'vehicle' });
    
    module.exports = Vehicle;

})();