(() => {

    'use strict';

    const Token = require('../../models/token.model');

    const createNewToken = (type, uid, token) => {
        return Token.create({ type, uid, token });
    }

    const deleteAllTokensForUser = (uid, type) => {
        return Token.destroy({ where: { uid, type }});
    }

    module.exports = {
        createNewToken,
        deleteAllTokensForUser
    }

})();