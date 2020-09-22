const { Model, DataTypes } = require("sequelize");
const Lane = require('./lane.model');
const Vehicle = require("./vehicle.model");
const sequelize = require('../middleware/database').getConnection();
const { ALLOCATION_STATUS } = require('../services/constants.service'); 
(() => {

    'use strict';

    class Allocation extends Model {};

    Allocation.init({
        date: { type: DataTypes.DATEONLY, defaultValue: new Date() },
        status: { type: DataTypes.STRING, defaultValue: ALLOCATION_STATUS.PENDING }
    }, { sequelize, modelName: 'allocation' });

    Allocation.belongsTo(Lane);
    Allocation.belongsTo(Vehicle);

    Lane.hasMany(Allocation);
    Vehicle.hasMany(Allocation);

    module.exports = Allocation;

})();