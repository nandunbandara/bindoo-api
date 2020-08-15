const councilController = require("../controllers/council.controller");
const RequestLogWrapper = require("../util/loghandler");

const init = app => {

    app.get('/councils/count', RequestLogWrapper(councilController.getCouncilsCount));
    app.get('/councils', RequestLogWrapper(councilController.viewAllCouncils));
    app.post('/councils', RequestLogWrapper(councilController.createCouncil));
    app.put('/councils/:uid', RequestLogWrapper(councilController.updateCouncil));
    app.delete('/councils/:uid', RequestLogWrapper(councilController.deleteCouncil));
};

module.exports = {init};