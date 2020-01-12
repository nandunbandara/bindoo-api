(() => {

    'use strict';

    const Sequelize = require('sequelize');
    const logger = require('./logger')

    const getConnection = () => {
        
        try {

            logger.info(`Connecting to database on ${process.env.DB_HOST}`);

            return new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
                host: process.env.DB_HOST,
                dialect: 'mysql'
            });

        } catch (err) {

            logger.error(`ERROR: ${err.message}`);

        }
    };

    module.exports = {
        getConnection
    };

})();