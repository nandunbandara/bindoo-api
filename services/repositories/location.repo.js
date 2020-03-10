(() => {

    'use strict';

    const Location = require('../../models/location.model');
    const UserRespository = require('./user.repo');

    const createLocation = async (name, description, type, address, longitude, latitude, uid, councilId) => {
        // const user = await UserRespository.getUserByUid(uid);
        return Location.create({
            name, description, type, address,
            longitude, latitude, userUid: uid, councilId
        });
    };

    const getLocationsByUserId = async uid => Location.findAll({ where: { userUid: uid } });

    const verifyLocation = async id => Location.update({ verified: true }, { where: { id } });

    const updateLocation = async (id, name, description, type, address, longitude, latitude) =>
        Location.update({
            name, description, type, address, longitude, latitude
        }, { where: { id }});

    module.exports = {
        createLocation,
        getLocationsByUserId,
        verifyLocation,
        updateLocation
    };

})();