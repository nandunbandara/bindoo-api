const httpStatus = require("http-status");
const firebaseAdmin = require("../services/firebase-admin");
const { USER_TYPES } = require("../services/constants.service");
const councilRepo = require("../services/repositories/council.repo");

const createCouncil = async (req, res) => {
    try {
        const firebaseResult = await firebaseAdmin.createNewUser(
            req.body.email, req.body.password, 
            req.body.name,
        );

        const customClaims = {
            userType: USER_TYPES.COUNCIL_MEMBER,
            councilId: firebaseResult.uid
        };

        await firebaseAdmin.updateCustomClaims(firebaseResult.uid, customClaims);

        const result = await councilRepo.createCouncil(firebaseResult.uid,
            req.body.name, req.body.description, req.body.email);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const viewAllCouncils = async (req, res) => {
    try {
        const result = await councilRepo.getCouncils();

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
};

const updateCouncil = async (req, res) => {
    try {
        const result = await councilRepo.updateCouncil(req.params.uid, req.body.name, req.body.description);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const deleteCouncil = async (req, res) => {
    try {
        await firebaseAdmin.deleteUser(req.params.uid);
        const result = await councilRepo.deleteCouncil(req.params.uid);

        return res.status(httpStatus.OK).json({
            success: true, data: result
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        });
    }
}

const getCouncilsCount = async (req, res) => {
    try {
        const data = await councilRepo.getCouncilsCount();

        return res.status(httpStatus.OK).json({
            success: true, data
        });
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false, error: err.message
        })
    }
}

module.exports = {
    createCouncil,
    viewAllCouncils,
    updateCouncil,
    deleteCouncil,
    getCouncilsCount
}