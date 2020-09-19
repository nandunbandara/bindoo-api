const RecyclableItem = require('./recyclable-item.model');

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
        stripeToken: { type: DataTypes.STRING, defaultValue: '' }
    }, { sequelize, modelName: 'organization' });

    module.exports = Organization;

})();