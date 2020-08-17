(() => {

    'use strict';

    const Joi = require('@hapi/joi');
    const { MOBILE_REGEX, NIC_REGEX } = require('../../regex');

    const UserSchema = Joi.object({
        name: Joi.string().required(),
        userType: Joi.number().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    module.exports = UserSchema;

})();