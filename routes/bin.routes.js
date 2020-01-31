(() => {
  "use strict";

  const RequestLogWrapper = require("../util/loghandler");
  const BinController = require("../controllers/bin.controller");

  const init = app => {
    app.get('/locations/:id/bins', BinController.getBinsByLocation);
    app.post(
      "/locations/:id/bins",
      RequestLogWrapper(BinController.createNewBin)
    );
    app.delete('/bins/:id', RequestLogWrapper(BinController.deleteBin));
  };

  module.exports = { init };
})();
