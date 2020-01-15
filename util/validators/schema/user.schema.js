(() => {

    'use strict';

    const Joi = require('@hapi/joi');
    const { MOBILE_REGEX, NIC_REGEX } = require('../../regex');

    const UserSchema = Joi.object({
        uid: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userType: Joi.number().required(),
        nic: Joi.string().regex(NIC_REGEX).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        mobile: Joi.string().regex(MOBILE_REGEX).required()
    });

    module.exports = UserSchema;

})();