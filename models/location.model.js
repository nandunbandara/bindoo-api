const Bin = require('./bin.model');
const { LOCATION_STATUS } = require('../services/constants.service');

(() => {

    'use strict';

    const { Model, DataTypes} = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Location extends Model {}

    Location.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        type: DataTypes.INTEGER,
        tax_id: DataTypes.INTEGER,
        building_number: DataTypes.STRING,
        line_1: DataTypes.STRING,
        line_2: DataTypes.STRING,
        city: DataTypes.STRING,
        verified: { type: DataTypes.BOOLEAN, defaultValue: false },
        status: { type: DataTypes.STRING, defaultValue: LOCATION_STATUS.ACTIVE }
    }, { sequelize, modelName: 'location'});

    Location.hasMany(Bin);

    Location.associate = models => {
        Location.belongsTo(models.user, { foreignKey: 'uid', as: 'user' });
        Location.belongsTo(models.council, { foreignKey: 'id', as: 'council' });
    };

    module.exports = Location;

})();