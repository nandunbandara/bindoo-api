const Lane = require("../../models/lane.model");
const { sequelize } = require("../../models/lane.model");

const createLane = (name, councilUid) => Lane.create({
    name, councilUid
});

const getLanesByCouncil = councilUid => Lane.findAll({
    where: { councilUid }
});

const getAmountOfGarbageByLanesByCouncil = (councilUid) => sequelize.query(
    `SELECT DISTINCT l.id, l.name, SUM(b.capacity) AS total FROM bins b, locations loc, lanes l ` + 
    `WHERE b.locationId = loc.id AND l.councilUid = '${councilUid}' AND  l.id = loc.laneId AND ` +
    `b.readyForCollection = 1 GROUP BY l.id`
);

module.exports = {
    createLane,
    getLanesByCouncil,
    getAmountOfGarbageByLanesByCouncil
};