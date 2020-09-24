const { Model, DataTypes } = require("sequelize");
const { INVOICE_STATUS } = require('../services/constants.service');
const Order = require("./order.model");
const sequelize = require('../middleware/database').getConnection();
(() => {

    'use strict';

    class Invoice extends Model {}

    Invoice.init({
        status: { type: DataTypes.STRING, defaultValue: INVOICE_STATUS.UNPAID }
    }, { sequelize, modelName: 'invoice' });

    Invoice.belongsTo(Order);
    Order.hasOne(Invoice);

    module.exports = Invoice;

})();