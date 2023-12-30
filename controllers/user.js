const userDB = require("../models/user");
const roleDB = require("../models/role");
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

const addRole = async (req, res, next) => {
  let dbUser = await userDB.findById(req.body.userId);
  let dbRole = await roleDB.findById(req.body.roleId);

  let findRole = dbUser.roles.find((rid) => rid.equals(dbRole._id));

  if (findRole) {
    next(new Error("Role already exit"));
  } else {
    await userDB.findByIdAndUpdate(dbUser.id, {
      $push: { roles: dbRole._id },
    });
    let user = await userDB.findById(dbUser._id);
    helper.format_message(res, "Added role to user", user);
  }
};

const removeRole = async (req, res, next) => {
  let dbUser = await userDB.findById(req.body.userId);
  let dbRole = await roleDB.findById(req.body.roleId);

  let findRole = dbUser.roles.find((rid) => rid.equals(dbRole._id));

  if (!findRole) {
    next(new Error("Role not found"));
  } else {
    await userDB.findByIdAndUpdate(dbUser.id, {
      $pull: { roles: dbRole._id },
    });
    let user = await userDB.findById(dbUser._id);
    helper.format_message(res, "Added role to user", user);
  }
};

module.exports = {
  register,
  login,
  addRole,
  removeRole
};
