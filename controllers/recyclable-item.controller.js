const httpStatus = require("http-status");
const recyclableItemRepo = require("../services/repositories/recyclable-item.repo");
const { RECYCLED_ITEM_STATUS } = require("../services/constants.service");
const { sendEvent } = require("../services/pusher.service");
const { getRecyclableItemsByStatus } = require("../services/repositories/recyclable-item.repo");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createRecycledItem = async (req, res) => {

    const { name, description, photo, organizationUid, userUid } = req.body;

    if (!name || !description || councilUid || userUid) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameters'
        });
    }

    try {
        const result = await recyclableItemRepo.createRecyclableItem(
            name, description, photo, organizationUid, userUid
        );

        await sendEvent(organizationUid, 'new-recyclable-item', result);

        return res.status(httpStatus.CREATED).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getRecyclableItemsByUser = async (req, res) => {

    const status = req.query.status !== 'undefined' && req.query.status;

    if (status && !Object.keys(RECYCLED_ITEM_STATUS).includes(status)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameter \'status\'',
            data: {
                required: Object.keys(RECYCLED_ITEM_STATUS),
                received: status
            }
        });
    }

    try {
        const result = status ? 
            await recyclableItemRepo.getRecyclableItemsByUserAndStatus(req.params.userUid, status) :
            await recyclableItemRepo.getRecyclableItemsByUser(req.params.userUid);
        
        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getRecyclableItemsByCouncil = async (req, res) => {

    const status = req.query.status !== 'undefined' && req.query.status;

    if (status && !Object.keys(RECYCLED_ITEM_STATUS).includes(status)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameter \'status\'',
            data: {
                required: Object.keys(RECYCLED_ITEM_STATUS),
                received: status
            }
        });
    }

    try {

        const result = status ? 
            await recyclableItemRepo.getRecyclableItemsByCouncilAndStatus(req.params.councilUid, status) :
            await recyclableItemRepo.getRecyclableItemsByCouncil(req.params.councilUid);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getAllRecyclableItems = async (req, res) => {

    const status = req.query.status !== 'undefined' && req.query.status;

    if (status && !Object.keys(RECYCLED_ITEM_STATUS).includes(status)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameter \'status\'',
            data: {
                required: Object.keys(RECYCLED_ITEM_STATUS),
                received: status
            }
        });
    }

    try {

        const result = status ? 
            await getRecyclableItemsByStatus(status) : 
            await getAllRecyclableItems();

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateRecycledItemStatus = async (req, res) => {
    const { status } = req.body;

    if (!status) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Parameter \'status\' is required'
        });
    }

    // validate status
    if (!Object.keys(RECYCLED_ITEM_STATUS).includes(status)) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameter \'status\'', 
            data: {
                required: Object.keys(RECYCLED_ITEM_STATUS),
                received: status
            }
        })
    }

    try {
        const result = await recyclableItemRepo
            .updateRecyclableItemStatus(req.params.id, status);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }

};

module.exports = {
    createRecycledItem,
    getAllRecyclableItems,
    getRecyclableItemsByCouncil,
    getRecyclableItemsByUser,
    updateRecycledItemStatus
}