(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Organization extends Model {}

    Organization.init({
        uid: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        email: DataTypes.STRING,
    }, { sequelize, modelName: 'organization' });

    module.exports = Organization;

})();