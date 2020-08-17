(() => {

    'use strict';

    const Token = require('../../models/token.model');

    const createNewToken = (type, uid, token) => {
        return Token.create({ type, uid, token });
    }

    const getTokenByUidAndType = (uid, type) => {
        return Token.findOne({ where: { type, uid }});
    }

    const deleteAllTokensForUser = (uid, type) => {
        return Token.destroy({ where: { uid, type }});
    }

    module.exports = {
        createNewToken,
        deleteAllTokensForUser,
        getTokenByUidAndType
    }

})();