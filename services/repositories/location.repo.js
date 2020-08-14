(() => {

    'use strict';

    const Location = require('../../models/location.model');
    const UserRespository = require('./user.repo');

    const createLocation = async (name, description, type, tax_id, building_number, line_1, line_2, city, uid, councilId) => {
        // const user = await UserRespository.getUserByUid(uid);
        return Location.create({
            name, description, type, tax_id,
            building_number, line_1, line_2, city,
            userUid: uid, councilId
        });
    };

    const getLocationsByUserId = async uid => Location.findAll({ where: { userUid: uid } });

    const getLocations = () => Location.findAll();

    const getLocationsByCouncil = id =>  Location.findAll({ where: { councilId: id }});

    const verifyLocation = async id => Location.update({ verified: true }, { where: { id } });

    const updateLocation = async (id, name, description, type, address, longitude, latitude) =>
        Location.update({
            name, description, type, address, longitude, latitude
        }, { where: { id }});

    module.exports = {
        createLocation,
        getLocationsByUserId,
        verifyLocation,
        updateLocation,
        getLocationsByCouncil,
        getLocations,
    };

})();