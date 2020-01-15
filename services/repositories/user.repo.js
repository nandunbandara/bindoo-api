(() => {

    /**
     * Handle CRUD for users
     */

     const User = require('../../models/user.model');

     const createNewUserRecord = (uid, firstName, lastName, userType, nic, email, mobile) => {
        return User.create({ uid, firstName, lastName, userType, nic, email, mobile });
     };

     const deleteUserRecord = uid => User.destroy({ where: { uid }});

     module.exports = {
         createNewUserRecord,
         deleteUserRecord
     };

})();