const Joi = require("joi");

module.exports = {
  permitSchema: {
    add: Joi.object({
      name: Joi.string().required(),
    }),
  },
  allSchema: {
    id: Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
};
