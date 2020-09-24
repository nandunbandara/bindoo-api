const { Model, DataTypes } = require("sequelize");
const Location = require("./location.model");
const Council = require("./council.model");
const sequelize = require('../middleware/database').getConnection();
(() => {

    'use strict';

    class Lane extends Model {}

    Lane.init({
        name: { type: DataTypes.STRING, unique: true }
    }, { sequelize, modelName: 'lane' });

    Lane.hasMany(Location);
    Location.belongsTo(Lane);

    Council.hasMany(Lane);
    Lane.belongsTo(Council);

    module.exports = Lane;

})();