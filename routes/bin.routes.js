(() => {
  "use strict";

  const RequestLogWrapper = require("../util/loghandler");
  const BinController = require("../controllers/bin.controller");

  const init = app => {
    app.get(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.getBinsByLocation)
    );
    app.post(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.createNewBin)
    );
    app.put("/bins/:id", RequestLogWrapper(BinController.updateBin))
    app.delete('/bins/:id', RequestLogWrapper(BinController.deleteBin));
  };

  module.exports = { init };
})();
