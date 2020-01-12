(() => {

    'use strict';

    const Sequelize = require('sequelize');

    const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });

    const getConnection = () => sequelize;

    module.exports = {
        getConnection
    };

})();