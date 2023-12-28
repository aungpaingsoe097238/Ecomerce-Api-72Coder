const Joi = require("joi");

module.exports = {
  permitSchema: {
    add: Joi.object({
      name: Joi.string().required(),
    }),
  },
  roleSchema: {
    addPermit: Joi.object({
      roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
  allSchema: {
    id: Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
};
