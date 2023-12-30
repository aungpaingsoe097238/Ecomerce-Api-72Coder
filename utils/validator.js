const jwt = require("jsonwebtoken");
const helper = require("../utils/helper");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let result = schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let decodeUser = jwt.verify(token, process.env.SECRET_KEY);
        if (decodeUser) {
          let RedisUser = await helper.get(decodeUser._id);
          if (RedisUser) {
            req.user = RedisUser;
            next();
          } else {
            next(new Error("Unathourized"));
          }
        } else {
          next(new Error("Unathourized"));
        }
      } else {
        next(new Error("Unathourized"));
      }
    };
  },
  validateRole: (role) => {
    return async (req, res, next) => {
      let findRole = await req.user.roles.find((ro) => ro.name === role);
      if (findRole) {
        next();
      } else {
        next(new Error("User don't have right permissions"));
      }
    };
  },
  hasAnyRole: (roles) => {
    return async (req, res, next) => {
      let bol = false;
      for (let i = 0; i < roles.length; i++) {
        let hasRole = req.user.roles.find((ro) => ro.name === roles[i]);
        if (hasRole) {
          bol = true;
          break;
        }
      }
      if (bol) next();
      else next(new Error("You don't have enough role"));
    };
  },
  hasAnyPermit: (permits) => {
    return async (req, res, next) => {
      let bol = false;
      for (let i = 0; i < permits.length; i++) {
        let hasPermit = req.user.permits.find((ro) => ro.name === permits[i]);
        if (hasPermit) {
          bol = true;
          break;
        }
      }
      if (bol) next();
      else next(new Error("You don't have enough permit"));
    };
  },
};
