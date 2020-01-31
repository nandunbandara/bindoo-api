(() => {

    'use strict';

    const Bin = require('../../models/bin.model');

    const createNewBinForLocation = (name, description, type, capacity, locationId) => {
        return Bin.create({
            name, description, type, capacity, locationId 
        });
    };

    const deleteBin = id => {
        return Bin.destroy({ where: { id } });
    };

    module.exports = {
        createNewBinForLocation,
        deleteBin
    };

})();