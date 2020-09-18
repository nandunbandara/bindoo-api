const RecycledItem = require('../../models/recycled-item.model');

const createRecycledItem = async (name, description, photo) =>
    RecycledItem.create({
        name, description, 
    })