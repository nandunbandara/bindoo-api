(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Vehicle extends Model {}

    Vehicle.init({
        registration_number: DataTypes.STRING,
        model: DataTypes.STRING,
        make: DataTypes.STRING,
        capacity: DataTypes.FLOAT
    }, { sequelize, modelName: 'vehicle' });

    Vehicle.associate = models => {
        Vehicle.belongsTo(models.council, { foreignKey: 'id'});
    }

    module.exports = Vehicle;

})();