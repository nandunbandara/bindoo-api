(() => {
  "use strict";

  const Joi = require("@hapi/joi");

  const BinSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    type: Joi.string().required(),
    capacity: Joi.number().require()
  });

  module.exports = BinSchema;
})();
