const paymentService = require('../services/stripe');
const httpStatus = require('http-status');

const createPaymentIntent = async (req, res) => {
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

const createCharge = async (req, res) => {

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

const createCustomerWithoutToken = async (req, res) => {
    const {uid, email} = req.body;

    if (!uid || !email) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameters'
        });
    }

    try {
        const result = await paymentService.createCustomerWithoutToken(uid, email);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
        
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const getSetupIntentClientSecret = async (req, res) => {
    try {
        const result = await paymentService.createSetupIntent();

        return res.status(httpStatus.OK).json({
            success: true, data: result.client_secret
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const attachPaymentMethodToCustomer = async (req, res) => {

    const { customerId, paymentMethodId } = req.body;

    if (!customerId || !paymentMethodId ) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false, error: 'Invalid parameters'
        })
    }

    try {

        const result = await paymentService.attachPaymentMethodToCustomer(customerId, paymentMethodId);

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
    createPaymentIntent,
    createCustomerWithoutToken,
    createCharge,
    getSetupIntentClientSecret,
    attachPaymentMethodToCustomer
}