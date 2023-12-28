const DB = require("../models/role");
const permitDB = require("../models/permit");
const helper = require("../utils/helper");

const all = async (req, res, next) => {
  let roles = await DB.find().populate("permits");
  helper.format_message(res, "Role list", roles);
};

const add = async (req, res, next) => {
  let dbRole = await DB.findOne({ name: req.body.name });
  if (dbRole) {
    next(new Error("Role name is alerady in use"));
  } else {
    let result = await new DB(req.body).save();
    helper.format_message(res, "Role create successfully", result);
  }
};

const get = async (req, res, next) => {
  let role = await DB.findById(req.params.id);
  if (role) {
    helper.format_message(res, "Single Role", role);
  } else {
    next(new Error("No Role with that id"));
  }
};

const patch = async (req, res, next) => {
  let dbRole = await DB.findById(req.params.id);
  if (dbRole) {
    await DB.findByIdAndUpdate(dbRole._id, req.body);
    let result = await DB.findById(dbRole._id);
    helper.format_message(res, "Role update", result);
  } else {
    next(new Error("No Role with that id"));
  }
};

const drop = async (req, res, next) => {
  let dbRole = await DB.findById(req.params.id);
  if (dbRole) {
    await DB.findByIdAndDelete(dbRole._id, req.body);
    helper.format_message(res, "Role deleted successfully");
  } else {
    next(new Error("No Role with that id"));
  }
};

const roleAddPermit = async (req, res, next) => {
  let dbRole = await DB.findById(req.body.roleId);
  let dbPermit = await permitDB.findById(req.body.permitId);

  if (dbRole && dbPermit) {
    await DB.findByIdAndUpdate(dbRole._id, {
      $push: { permits: dbPermit._id },
    });
    let result = await DB.findById(dbRole._id);
    helper.format_message(res, "Permissions adding successfully", result);
  } else {
    next(new Error("No role with that id"));
  }
};

const roleRemovePermit = async (req, res, next) => {
  let dbRole = await DB.findById(req.body.roleId);
  let dbPermit = await permitDB.findById(req.body.permitId);

  if (dbRole && dbPermit) {
    await DB.findByIdAndUpdate(dbRole._id, {
      $pull: { permits: dbPermit._id },
    });
    let result = await DB.findById(dbRole._id);
    helper.format_message(res, "Permissions removing successfully", result);
  } else {
    next(new Error("No role with that id"));
  }
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
  roleAddPermit,
  roleRemovePermit,
};
