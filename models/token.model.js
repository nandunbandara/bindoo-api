(() => {

    'use strict';

    const { Model, DataTypes, DATE} = require('sequelize');
    const sequelize = require('../middleware/database').getConnection();

    class Token extends Model {}

    Token.init({
        type: DataTypes.STRING,
        uid: DataTypes.STRING,
        token: DataTypes.STRING,
    }, { sequelize, modelName: 'token'});

    module.exports = Token;

})();