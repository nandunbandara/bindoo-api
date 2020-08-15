const Vehicle = require("../../models/vehicle.model");

const createVehicle = (registration_number, model, make, capacity, councilId) => 
    Vehicle.create({registration_number, model, make, capacity, councilId});

const updateVehicle = (id, registration_number, model, make, capacity) => 
    Vehicle.update(
        { registration_number, model, make, capacity }, 
        { where: {id}}
    );

const deleteVehicle = id => Vehicle.destroy({ where: {id}});

const getVehiclesByCouncil = councilId => Vehicle.findAll({ where: { councilId }});

const getAllVehicles = () => Vehicle.findAll();

module.exports = {
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehiclesByCouncil,
    getAllVehicles
}