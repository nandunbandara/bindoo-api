(() => {
  "use strict";

  const admin = require("firebase-admin");
  const serviceAccount = require("../config/serviceaccount.json");

  const init = () => {
    admin.initializeApp({
      credential: admin.credential.cert(
        serviceAccount || process.env.SERVICE_ACCOUNT
      )
    });
  };

  module.exports = init;
})();
