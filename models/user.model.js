(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    const Location = require('./location.model');

    class User extends Model {}

    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        userType: DataTypes.INTEGER,
        nic: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        isActive: DataTypes.BOOLEAN
    }, { sequelize, modelName: 'user'});

    User.hasMany(Location);

    module.exports = User;

})();