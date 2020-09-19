const RecyclableItem = require('../../models/recyclable-item.model');

const createRecyclableItem = (name, description, photo, organizationUid, userUid) =>
    RecyclableItem.create({
        name, description, photo, organizationUid, userUid
    });

const updateRecyclableItemStatus = (id, status) => 
    RecyclableItem.update({
        status
    }, { where: { id }});

const getAllRecyclableItems = () => RecyclableItem.findAll();

const getRecyclableItemsByCouncil = councilUid => RecyclableItem.findAll({
    where: {
        councilUid
    }
});

const getRecyclableItemsByUser = userUid =>  RecyclableItem.findAll({
    where: {
        userUid
    }
});

const getRecyclableItemsByCouncilAndStatus = (councilUid, status) => 
    RecyclableItem.findAll({
        where: {
            councilUid, status
        }
    });

const getRecyclableItemsByUserAndStatus = (userUid, status) => 
    RecyclableItem.findAll({
        where: {
            userUid,
            status
        }
    });

const getRecyclableItemsByStatus = status => 
    RecyclableItem.findAll({
        where: {
            status
        }
    });

module.exports = {
    createRecyclableItem,
    updateRecyclableItemStatus,
    getAllRecyclableItems,
    getRecyclableItemsByCouncil,
    getRecyclableItemsByUser,
    getRecyclableItemsByCouncilAndStatus,
    getRecyclableItemsByUserAndStatus,
    getRecyclableItemsByStatus,
};