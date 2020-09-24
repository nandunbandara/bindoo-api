const { Model, DataTypes } = require("sequelize");
const Order = require("./order.model");
const Item = require("./item.model");
const sequelize = require('../middleware/database').getConnection();

(() => {

    'use strict';

    class OrderItem extends Model {}

    OrderItem.init({
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: Order,
                key: 'id'
            }
        },

        itemId: {
            type: DataTypes.INTEGER,
            references: {
                model: Item,
                key: 'id'
            }
        }

    }, { sequelize, modelName: 'order_item' });

    module.exports = OrderItem;

})();