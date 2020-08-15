const councilController = require("../controllers/council.controller");
const councilRepo = require("../services/repositories/council.repo");

const init = app => {
    app.get('/councils', councilController.viewAllCouncils);
    app.post('/councils', councilRepo.createCouncil);
    app.put('/councils/:uid', councilRepo.updateCouncil);
    app.delete('/councils/:uid', councilRepo.deleteCouncil);
};

module.exports = {init};