(() => {
  "use strict";

  const express = require("express");
  const logger = require("./middleware/logger");
  const middleware = require("./middleware");

  const PORT = process.env.PORT | 9080;

  const app = express();
  middleware(app);

  app.listen(PORT, err => {
    if (err) {
      logger.error(
        `Application could not start on port ${PORT}: ${err.message}`
      );
    }
    logger.info(`Application started on port ${PORT}`);
  });

  module.exports = app;
})();
