(() => {
  "use strict";

  const LocationController = require("../controllers/location.controller");

  const init = app => {
    app.post("/users/:uid/locations", LocationController.createLocation);
  };
})();
