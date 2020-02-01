(() => {
  "use strict";

  const RequestLogWrapper = require("../util/loghandler");
  const BinController = require("../controllers/bin.controller");

  const init = app => {
    app.get(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.getBinsByLocation)
    );
    app.get('/bins/:id', BinController.getBinById);
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
