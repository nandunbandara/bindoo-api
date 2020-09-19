const RecyclableItem = require('../../models/recyclable-item.model');

const createRecyclableItem = (name, description, photo, organizationUid, userUid) =>
    RecyclableItem.create({
        name, description, photo, organizationUid, userUid
    });

const updateRecyclableItemStatus = (id, status) => 
    RecyclableItem.update({
        status
    }, { where: { id }});

module.exports = {
    createRecyclableItem,
    updateRecyclableItemStatus
}