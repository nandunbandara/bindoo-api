(() => {

    /**
     * Handle CRUD for users
     */

     const User = require('../../models/user.model');

     const createNewUserRecord = (uid, name, userType, email) => {
        return User.create({ uid, name, userType, email });
     };
    
    const updateStripeToken = (uid, stripeToken) => User.update(
        { stripeToken },
        { where: { uid } }
    );

     const getUserByUid = uid => User.findOne({ where: { uid }});

     const deleteUserRecord = uid => User.destroy({ where: { uid }});

     module.exports = {
         createNewUserRecord,
         updateStripeToken,
         getUserByUid,
         deleteUserRecord
     };

})();