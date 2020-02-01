(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Bin extends Model {}

    Bin.init({
        name: DataTypes.STRING, // name of the bin
        description: DataTypes.TEXT,
        type: DataTypes.INTEGER,
        capacity: DataTypes.FLOAT,
        readyForCollection: { type: DataTypes.BOOLEAN, defaultValue: false }
    }, { sequelize, modelName: 'bin' });

    Bin.associate = models => {
        Bin.belongsTo(models.location, { foreignKey: 'id' });
    };

    module.exports = Bin;

})();