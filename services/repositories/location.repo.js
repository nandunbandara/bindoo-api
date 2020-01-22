(() => {

    'use strict';

    const Location = require('../../models/location.model');
    const UserRespository = require('./user.repo');

    const createLocation = async (name, description, type, address, longitude, latitude, uid) => {
        const user = await UserRespository.getUserByUid(uid);
        return Location.create({
            name, description, type, address,
            longitude, latitude, userUid: uid
        });
    };

    module.exports = {
        createLocation
    };

})();