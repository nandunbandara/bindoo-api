(() => {

    'use strict';

    const crypto = require('crypto');

    const generateRandomToken = () => {
        
        return new Promise((resolve, reject) => {
            crypto.randomBytes(48, function(err, buffer) {
                if (err) {
                    reject(err);
                }
                const token = buffer.toString('hex');
                resolve(token);
            });
        })

    }

    module.exports = {
        generateRandomToken
    }

})();