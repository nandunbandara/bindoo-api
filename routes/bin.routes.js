(() => {
  "use strict";

  const RequestLogWrapper = require("../util/loghandler");
  const BinController = require("../controllers/bin.controller");

  const init = app => {
    app.get('/users/:uid/bins/count', RequestLogWrapper(BinController.getBinCountByUser));
    app.get('/users/:uid/bins', RequestLogWrapper(BinController.getBinsByUser));
    app.get(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.getBinsByLocation)
    );
    app.get('/bins/:id', RequestLogWrapper(BinController.getBinById));
    app.get('/bins/readyForCollection/:status', RequestLogWrapper(BinController.getBinByStatus));
    app.get('/councils/:councilUid/bins', RequestLogWrapper(BinController.getAllBinsByCouncil));
    app.post(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.createNewBin)
    );
    app.put("/bins/:id", RequestLogWrapper(BinController.updateBin));
    app.put('/bins/:id/readyForCollection', RequestLogWrapper(BinController.changeBinReadyForCollectionStatus));
    app.delete('/bins/:id', RequestLogWrapper(BinController.deleteBin));

    app.get('/councils/:councilUid/bins/readyForCollection/:status', RequestLogWrapper(BinController.getBinsByCouncilAndStatus));

  };

  module.exports = { init };
})();
