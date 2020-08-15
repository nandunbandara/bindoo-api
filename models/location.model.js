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
        tax_id: DataTypes.INTEGER,
        building_number: DataTypes.STRING,
        line_1: DataTypes.STRING,
        line_2: DataTypes.STRING,
        city: DataTypes.STRING,
        verified: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { sequelize, modelName: 'location'});

    Location.associate = models => {
        Location.belongsTo(models.user, { foreignKey: 'uid', as: 'user' });
        Location.belongsTo(models.council, { foreignKey: 'id', as: 'council' });
        Location.hasMany(Bin, {
            onDelete: 'CASCADE',
        });
    };

    module.exports = Location;

})();