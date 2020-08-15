const Location = require('../../models/location.model');

(() => {

    'use strict';

    const Bin = require('../../models/bin.model');

    const createNewBinForLocation = (name, description, type, capacity, locationId) => {
        return Bin.create({
            name, description, type, capacity, locationId 
        });
    };

    const updateBin = (id, name, description, type, capacity) => {
        return Bin.update(
            { name, description, type, capacity },
            { where: { id }}
        );
    };

    const getBinsByLocation = id => Bin.findAll({ where: { locationId: id } });

    const getBinById = id => Bin.findOne({ where: { id } });

    const getBinsByStatus = status => Bin.findAll({ where: { readyForCollection: status }, include: [ { model: Location, as: 'location' } ] });

    const deleteBin = id =>  Bin.destroy({ where: { id } });

    const updateReadyForCollectionStatus = (id, status) => {
        return Bin.update({ readyForCollection: status }, { where: { id } });
    };

    module.exports = {
        createNewBinForLocation,
        updateBin,
        getBinsByLocation,
        getBinById,
        getBinsByStatus,
        deleteBin,
        updateReadyForCollectionStatus
    };

})();