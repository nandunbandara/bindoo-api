const { TOKEN_TYPES } = require('../services/constants.service');

(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');
    const logger = require('../middleware/logger');
    const UserRepository = require('../services/repositories/user.repo');
    const EmailService = require('../services/email.service');
    const Random = require('../util/random');
    const TokenRepository = require('../services/repositories/token.repo');

    const sendVerificationEmailToUser = async (req, res) => {
        try {
            const user = await UserRepository.getUserByUid(req.params.uid);

            if (!user) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({
                    success: false, error: 'User not found for provided uid'
                });
            }

            // delete all tokens for user
            await TokenRepository.deleteAllTokensForUser(user.uid, TOKEN_TYPES.EMAIL_VERIFICATION);

            const token = await Random.generateRandomToken();

            const tokenResult = await TokenRepository.createNewToken(TOKEN_TYPES.EMAIL_VERIFICATION, user.uid, token);

            const result = await EmailService.sendVerificationEmail(
                user.email, user.name, process.env.APP_HOST + '/verify?token='+tokenResult.token
            );

            return res.status(HTTP_STATUS.OK).json({
                success: true, data: result
            });
            
        } catch (err) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                success: false, error: err.message
            });
        }
    }

    module.exports = {
        sendVerificationEmailToUser
    }

})();