(() => {

    'use strict';

    const admin = require('firebase-admin');

    /**
     * 
     * @param {string} email
     * @param {string} password 
     * @param {string} displayName : Concat of firstName and lastName
     */
    const createNewUser = (email, password, displayName) => admin.auth().createUser({email, password, displayName});

    const verifyEmail = uid => admin.auth().updateUser(uid, { emailVerified: true });

    const deleteUser = uid => admin.auth().deleteUser(uid);

    const verifyToken = token => admin.auth().verifyIdToken(token);

    const updateCustomClaims = (uid, claims) =>  admin.auth().setCustomUserClaims(uid, claims);

    module.exports = {
        createNewUser,
        deleteUser,
        verifyToken,
        verifyEmail,
        updateCustomClaims
    };

})();