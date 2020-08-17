(() => {

    'use strict';

    const Council = require('../../models/council.model');

    const createCouncil = (uid, name, description, email) =>
        Council.create({uid, name, description, email});
    
    const updateCouncil = (uid, name, description) =>
        Council.update(
            { name, description },
            { where: { uid }}
        );

    const deleteCouncil = uid => Council.destroy({ where: { uid } });

    const getCouncils = () => Council.findAll();

    const getCouncilsCount = () =>  Council.count();

    module.exports = {
        createCouncil,
        updateCouncil,
        deleteCouncil,
        getCouncils,
        getCouncilsCount
    };

})();