const DB = require("../models/permit");
const helper = require("../utils/helper");

const all = async (req, res, next) => {
  let permits = await DB.find();
  helper.format_message(res, "Permission list", permits);
};

const add = async (req, res, next) => {
  let dbPermit = await DB.findOne({ name: req.body.name });
  if (dbPermit) {
    next(new Error("Permission name is alerady in use"));
  } else {
    let result = await new DB(req.body).save();
    helper.format_message(res, "Permission create successfully", result);
  }
};

const get = async (req, res, next) => {
  let permit = await DB.findById(req.params.id);
  if (permit) {
    helper.format_message(res, "Single permission", permit);
  } else {
    next(new Error("No permission with that id"));
  }
};

const patch = async (req, res, next) => {
  let dbPermit = await DB.findById(req.params.id);
  if (dbPermit) {
    await DB.findByIdAndUpdate(dbPermit._id, req.body);
    let result = await DB.findById(dbPermit._id);
    helper.format_message(res, "Permission update", result);
  } else {
    next(new Error("No permission with that id"));
  }
};

const drop = async (req, res, next) => {
  let dbPermit = await DB.findById(req.params.id);
  if (dbPermit) {
    await DB.findByIdAndDelete(dbPermit._id, req.body);
    helper.format_message(res, "Permission deleted successfully");
  } else {
    next(new Error("No permission with that id"));
  }
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
