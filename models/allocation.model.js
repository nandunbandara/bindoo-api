const { Model, DataTypes } = require("sequelize");
const Lane = require('./lane.model');
const Vehicle = require("./vehicle.model");
const sequelize = require('../middleware/database').getConnection();
const { ALLOCATION_STATUS } = require('../services/constants.service'); 
const Council = require("./council.model");
(() => {

    'use strict';

    class Allocation extends Model {};

    Allocation.init({
        date: { type: DataTypes.DATEONLY, defaultValue: new Date() },
        status: { type: DataTypes.STRING, defaultValue: ALLOCATION_STATUS.PENDING },
        amount: { type: DataTypes.FLOAT },
    }, { sequelize, modelName: 'allocation' });

    Allocation.belongsTo(Lane);
    Allocation.belongsTo(Vehicle);
    Allocation.belongsTo(Council);

    Lane.hasMany(Allocation);
    Vehicle.hasMany(Allocation);
    Council.hasMany(Allocation);

    module.exports = Allocation;

})();