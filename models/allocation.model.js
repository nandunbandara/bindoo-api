const { Model, DataTypes } = require("sequelize");
const Bin = require("./bin.model");
const Vehicle = require("./vehicle.model");
const sequelize = require('../middleware/database').getConnection();

(() => {

    'use strict';

    class Allocation extends Model {};

    Allocation.init({
        date: { type: DataTypes.DATEONLY, defaultValue: new Date() },
    }, { sequelize, modelName: 'allocation' });

    Allocation.hasOne(Bin);
    Allocation.hasOne(Vehicle);

    module.exports = Allocation;

})();