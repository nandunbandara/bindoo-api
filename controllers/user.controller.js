(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');

    const logger = require('../middleware/logger');
    const firebaseAdmin = require('../services/firebase-admin');
    const UserRepository = require('../services/repositories/user.repo');

    const createNewUser = async (req, res) => {

        try {

            logger.info('[SVC] services.controllers.users.createNewUser: creating user on firebase');

            const firebaseResult = await firebaseAdmin.createNewUser(
                req.body.email, req.body.password, 
                [req.body.firstName, req.body.lastName].join(' ') // display name
            );

            logger.info(`[SVC] services.controllers.users.createNewUser: firebase uid ${firebaseResult.uid}`);

            const result = await UserRepository.createNewUserRecord(
                firebaseResult.uid, // uid of user created on firebase
                req.body.firstName, req.body.lastName, req.body.userType,
                req.body.nic, req.body.email, req.body.mobile
            );
            
            logger.info(`[SVC] services.controllers.users.createNewUser: user db record created for ${result.uid}`);

            return res.status(HTTP_STATUS.CREATED).json({
                success: true, data: result
            });

        } catch (err) {

            logger.error(`[ERROR] services.controllers.users.createNewUser: ${err.message}`)

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }

    };

    const getUserByUid = async (req, res) => {

        try {

            logger.info(`[SVC] services.controllers.users.createNewUser: retrieving user ${req.params.uid}`);

            const result = await UserRepository.getUserByUid(req.params.uid);

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {

            logger.error(`[ERROR] services.controllers.users.getUserByUid: ${err.message}`);

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }

    };

    const deleteUser = async (req, res) => {

        try {

            logger.info(`[SVC] services.controllers.users.deleteUser: deleting user on database: uid ${req.params.uid}`);
            await UserRepository.deleteUserRecord(req.params.uid);

            logger.info('[SVC] services.controllers.users.deleteUser: deleting user on firebase');
            await firebaseAdmin.deleteUser(req.params.uid);

            return res.status(HTTP_STATUS.OK).json({ success: true });

        } catch (err) {

            logger.error(`[ERROR] services.controllers.users.deleteUser: ${err.message}`);

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });

        }

    };

    module.exports = {
        createNewUser,
        getUserByUid,
        deleteUser,
    };

})();