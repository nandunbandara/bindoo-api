(() => {
  "use strict";

  const admin = require("firebase-admin");

  /**
   *
   * @param {string} email
   * @param {string} password
   * @param {string} displayName : Concat of firstName and lastName
   */
  const createNewUser = (email, password, displayName) =>
    admin.auth().createUser({ email, password, displayName });

  const deleteUser = uid => admin.auth().deleteUser(uid);

  module.exports = {
    createNewUser,
    deleteUser
  };
})();
