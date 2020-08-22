const paymentService = require('../services/stripe');
const httpStatus = require('http-status');

const createPaymentIntent = (req, res) => {
    try {
        const result = await paymentService.createSetupIntent();

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const createCharge = (req, res) => {

    const {amount, source, description} = req.body;

    if (!amount || !source || !description) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameters'
        });
    }

    try { 
        const result = await paymentService.createCharge(
            amount, source, description
        )
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
}

module.exports = {
    createPaymentIntent,
    createCharge
}