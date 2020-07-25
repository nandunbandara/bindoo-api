(() => {

    'use strict';

    const { Model, DataTypes } = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    const Location = require('./location.model');

    class User extends Model {}

    User.init({
        uid: { type: DataTypes.STRING, primaryKey: true, unique: true },
        name: DataTypes.STRING,
        userType: DataTypes.INTEGER,
        email: { type: DataTypes.STRING, unique: true },
        isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
        stripeToken: { type: DataTypes.STRING }
    }, { sequelize, modelName: 'user'});

    User.hasMany(Location, {
        onDelete: 'CASCADE'
    });

    module.exports = User;

})();