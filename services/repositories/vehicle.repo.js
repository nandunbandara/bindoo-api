const Vehicle = require("../../models/vehicle.model");
const Council = require("../../models/council.model");

const createVehicle = (registration_number, model, make, capacity, councilUid) => 
    Vehicle.create({registration_number, model, make, capacity, councilUid});

const updateVehicle = (id, registration_number, model, make, capacity) => 
    Vehicle.update(
        { registration_number, model, make, capacity }, 
        { where: {id}}
    );

const deleteVehicle = id => Vehicle.destroy({ where: {id}});

const getVehiclesByCouncil = councilUid => Vehicle.findAll({ where: { councilUid }});

const getAllVehicles = () => Vehicle.findAll();

const getVehiclesCountByCouncil = councilUid => Vehicle.count({ councilUid });

const getVehiclesCount = () => Vehicle.count();

module.exports = {
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehiclesByCouncil,
    getAllVehicles,
    getVehiclesCountByCouncil,
    getVehiclesCount
}