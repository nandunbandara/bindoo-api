(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Council extends Model {}

    Council.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        province: DataTypes.INTEGER,
        district: DataTypes.INTEGER,
    }, { sequelize, modelName: 'council' });

    module.exports = Council;

})();