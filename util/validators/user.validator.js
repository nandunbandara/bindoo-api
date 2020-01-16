(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');
    const schema = require('./schema/user.schema');

    const userSignUpValidator = (req, res, next) => {

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
                success: false, 
                error: error.message 
            });
        }

        next();

    };

    module.exports = {
        userSignUpValidator
    };

})();