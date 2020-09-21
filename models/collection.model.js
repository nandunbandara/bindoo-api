const { Model, DataTypes } = require("sequelize");
const sequelize = require('../middleware/database').getConnection();
const User = require('../models/user.model');
const Location = require('../models/location.model');
const Council  = require('../models/council.model');
(() => {
    
    'use strict';

    class Collection extends Model {};

    Collection.init({
        date: { type: DataTypes.DATE, defaultValue: new Date() },
        amount: DataTypes.FLOAT,
    }, { sequelize, modelName: 'collection' });

    Collection.belongsTo(User);
    Collection.belongsTo(Location);
    Collection.belongsTo(Council);

    User.hasMany(Collection);
    Location.hasMany(Collection);
    Council.hasMany(Collection);
    
    module.exports = Collection;
})();