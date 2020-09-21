const Lane = require("../../models/lane.model")

const createLane = (name, councilUid) => Lane.create({
    name, councilUid
});

const getLanesByCouncil = councilUid => Lane.findAll({
    where: { councilUid }
});

module.exports = {
    createLane,
    getLanesByCouncil
};