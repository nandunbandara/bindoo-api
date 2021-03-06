(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');

    const logger = require('../middleware/logger');
    const firebaseAdmin = require('../services/firebase-admin');
    const UserRepository = require('../services/repositories/user.repo');
    const { USER_TYPES } = require('../services/constants.service');

    const createNewUser = async (req, res) => {

        try {

            logger.info('[SVC] services.controllers.users.createNewUser: creating user on firebase');

            const firebaseResult = await firebaseAdmin.createNewUser(
                req.body.email, req.body.password, 
                req.body.name // display name
            );

            logger.info(`[SVC] services.controllers.users.createNewUser: firebase uid ${firebaseResult.uid}`);

            const customClaims = {
                userType: req.body.userType
            };

            if (req.body.userType === USER_TYPES.COUNCIL_MEMBER) {
                customClaims.councilId = req.body.councilId
            };

            await firebaseAdmin.updateCustomClaims(firebaseResult.uid, customClaims)

            const result = await UserRepository.createNewUserRecord(
                firebaseResult.uid, // uid of user created on firebase
                req.body.name, req.body.userType,
                req.body.email
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

    const updateStripeTokenForUser = async (req, res) => {

        try {

            logger.info(`[SVC] services.controllers.users.updateStripeTokenForUser`);

            const result = await UserRepository.updateStripeToken(
                req.params.uid,
                req.body.stripeToken
            );

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });

        } catch (err) {
            logger.error(`[ERROR] services.controllers.users.updateStripeTokenForUser: ${err.message}`);

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
        updateStripeTokenForUser,
        getUserByUid,
        deleteUser,
    };

})();