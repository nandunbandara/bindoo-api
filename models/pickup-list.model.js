const { Model, DataTypes } = require("sequelize");
const Council = require("./council.model");
const sequelize = require('../middleware/database').getConnection();
(() => {

    'use-strict';

    class PickupList extends Model {}

    PickupList.init({
        date: { type: DataTypes.DATEONLY },
    }, { sequelize, modelName: 'pickup_list' });

    PickupList.belongsTo(Council);
    Council.hasMany(PickupList);

    module.exports = PickupList;

})();