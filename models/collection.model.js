const { Model, DataTypes } = require("sequelize");
const sequelize = require('../middleware/database').getConnection();
const Council  = require('../models/council.model');
const Lane = require("./lane.model");

(() => {
    
    'use strict';

    class Collection extends Model {};

    Collection.init({
        date: { type: DataTypes.DATE, defaultValue: new Date() },
        amount: DataTypes.FLOAT,
    }, { sequelize, modelName: 'collection' });

    Collection.belongsTo(Council);
    Collection.belongsTo(Lane);

    Council.hasMany(Collection);
    Lane.hasMany(Collection);
    
    module.exports = Collection;
})();