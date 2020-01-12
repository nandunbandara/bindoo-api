(() => {

    'use strict';

    const express = require('express');
    const logger = require('./middleware/logger');
    
    const PORT = process.env.PORT | 9080;

    const app = express();

    app.listen(PORT, err => {
        if (err) { 
            logger.error(`Application could not start on port ${PORT}: ${err.message}`);
         }
        logger.info(`Application started on port ${PORT}`);
    });

})();