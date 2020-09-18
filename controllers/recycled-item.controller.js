const httpStatus = require("http-status");

const createRecycledItem = (req, res) => {

    const { name, description, status, photo } = req.body;

    if (!name || !description) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameters'
        });
    }

    try {

        

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const updateRecycledItemStatus = (req, res) => {

};

module.exports = {
    createRecycledItem,
    updateRecycledItemStatus
}