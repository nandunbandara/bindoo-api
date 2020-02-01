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

    const getBinsByLocation = id => {
        return Bin.findAll({ where: { locationId: id } });
    };

    const deleteBin = id => {
        return Bin.destroy({ where: { id } });
    };

    module.exports = {
        createNewBinForLocation,
        updateBin,
        getBinsByLocation,
        deleteBin
    };

})();