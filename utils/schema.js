const Joi = require("joi");

module.exports = {
  userSchema: {
    register: Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(7).max(11).required(),
      password: Joi.string().min(8).required(),
    }),
    login: Joi.object({
      phone: Joi.string().required(),
      password: Joi.string().required(),
    }),
    addRole: Joi.object({
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      roleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
    addPermit: Joi.object({
      userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
      permitId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
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
