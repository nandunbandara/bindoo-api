(() => {

    'use strict';

    const { Model, DataTypes} = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    const Bin = require('./bin.model');

    class Location extends Model {}

    Location.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.INTEGER,
        address: DataTypes.STRING,
        longitude: DataTypes.DOUBLE,
        latitude: DataTypes.DOUBLE
    }, { sequelize, modelName: 'location'});

    Location.hasMany(Bin);

    Location.associate = models => {
        Location.belongsTo(models.user, { foreignKey: 'uid' });
    };

    module.exports = Location;

})();