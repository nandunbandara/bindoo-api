(() => {

    'use strict';

    const Council = require('../../models/council.model');

    const createCouncil = (name, description, province, district) =>
        Council.create(name, description, province, district);
    
    const updateCouncil = (id, name, description, province, district) =>
        Council.update(
            { name, description, province, district },
            { where: { id }}
        );

    const deleteCouncil = id => Council.destroy({ where: { id } });

    const getCouncils = () => Council.findAll();

    module.exports = {
        createCouncil,
        updateCouncil,
        deleteCouncil,
        getCouncils
    };

})();