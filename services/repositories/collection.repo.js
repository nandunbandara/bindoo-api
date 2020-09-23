const Collection = require("../../models/collection.model");

const createCollection = (laneId, councilUid, amount, date = new Date()) => Collection.create({
    laneId, councilUid, date, amount
});

const getAllCollections = () => Collection.findAll();

module.exports = {
    createCollection,
    getAllCollections
}