const userDB = require("../models/user");
const helper = require("../utils/helper");

const register = async (req, res, next) => {
  let dbUserEmail = await userDB.findOne({ email: req.body.email });

  if (dbUserEmail) {
    next(new Error("Email is already in used."));
    return;
  }

  let dbUserPhone = await userDB.findOne({ phone: req.body.phon });

  if (dbUserPhone) {
    next(new Error("Phone is already in used."));
    return;
  }

  let result = await new userDB(req.body).save();

  helper.format_message(res, "Register success", result);
};

const login = async (req, res, next) => {
  const dbUser = await userDB
    .findOne({ phone: req.body.phone })
    .populate("roles permits")
    .select("-__v");
  if (dbUser) {
    if (helper.comparePass(req.body.password, dbUser.password)) {
      let user = dbUser.toObject();
      delete user.password;
      user.token = helper.makeToken(user);
      helper.set(user._id, user);
      helper.format_message(res, "Login Success", user);
    } else {
      next(new Error("Credential Error"));
    }
  } else {
    next(new Error("Credential Error"));
  }
};

module.exports = {
  register,
  login,
};
