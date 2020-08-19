(() => {
  "use strict";

  const RequestLogWrapper = require("../util/loghandler");
  const BinController = require("../controllers/bin.controller");

  const init = app => {
    app.get('/users/:uid/bins/count', BinController.getBinCountByUser);
    app.get('/users/:uid/bins', BinController.getBinsByUser);
    app.get(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.getBinsByLocation)
    );
    app.get('/bins/:id', BinController.getBinById);
    app.get('/bins/readyForCollection/:status', BinController.getBinByStatus)
    app.post(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.createNewBin)
    );
    app.put("/bins/:id", RequestLogWrapper(BinController.updateBin));
    app.put('/bins/:id/readyForCollection', RequestLogWrapper(BinController.changeBinReadyForCollectionStatus));
    app.delete('/bins/:id', RequestLogWrapper(BinController.deleteBin));

  };

  module.exports = { init };
})();
