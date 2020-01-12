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
    }, { sequelize, modelName: 'bin' });

    module.exports = Bin;

})();