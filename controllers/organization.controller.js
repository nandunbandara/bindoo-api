const httpStatus = require("http-status")
const organizationRepository = require('../services/repositories/organization.repo');
const firebaseAdmin = require("../services/firebase-admin");
const { USER_TYPES } = require("../services/constants.service");

const createOrganization = async (req, res) => {
    try {
        const firebaseResult = await firebaseAdmin.createNewUser(
            req.body.email, req.body.password, 
            req.body.name,
        );

        const customClaims = {
            userType: USER_TYPES.ORGANIZATION_MEMBER,
            organizationId: firebaseResult.uid
        };

        await firebaseAdmin.updateCustomClaims(firebaseResult.uid, customClaims);
        const result = await organizationRepository.createOrganization(firebaseResult.uid, req.body.name, req.body.description, req.body.email);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}


const updateOrganization = async (req, res) => {
    try {

        const result = await organizationRepository.updateOrganization(req.params.uid, req.body.name, req.body.description);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });

    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const deleteOrganization = async (req, res) => {
    try {
        await firebaseAdmin.deleteUser(req.params.uid);
        const result = await organizationRepository.deleteOrganization(req.params.uid);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const getAllOrganizations = async (req, res) => {
    try {
        const result = await organizationRepository.getOrganizations();

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

module.exports = {
    createOrganization,
    updateOrganization,
    deleteOrganization,
    getAllOrganizations,
}