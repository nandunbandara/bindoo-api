const { Model, DataTypes } = require("sequelize");
const Bin = require("./bin.model");
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

    Allocation.belongsTo(Bin);
    Allocation.belongsTo(Vehicle);

    Bin.hasMany(Allocation);
    Vehicle.hasMany(Allocation);

    module.exports = Allocation;

})();