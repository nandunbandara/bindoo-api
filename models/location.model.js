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
        verified: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { sequelize, modelName: 'location'});

    Location.hasMany(Bin, {
        onDelete: 'CASCADE',
    });

    Location.associate = models => {
        Location.belongsTo(models.user, { foreignKey: 'uid', as: 'user' });
        Location.belongsTo(models.council, { foreignKey: 'id', as: 'council' });
    };

    module.exports = Location;

})();