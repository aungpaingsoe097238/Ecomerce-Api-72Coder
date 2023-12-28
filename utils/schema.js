const Joi = require("joi");

module.exports = {
  permitSchema: {
    add: Joi.object({
      name: Joi.string().required(),
    }),
  },
};
