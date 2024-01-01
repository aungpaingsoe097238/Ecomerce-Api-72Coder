const DB = require("../models/category");
const helper = require("../utils/helper");

const all = async (req, res, next) => {
  const dbCats = await DB.find().populate('subcats');
  helper.format_message(res, "All cats", dbCats);
};

const add = async (req, res, next) => {
  const dbCat = await DB.findOne({ name: req.body.name });
  if (dbCat) {
    next(new Error("Cat is already in use"));
    return;
  } else {
    let result = await new DB(req.body).save();
    helper.format_message(res, "Cat save successfully", result);
  }
};

const get = async (req, res, next) => {
  const dbCat = await DB.findById(req.params.id);
  if (dbCat) {
    helper.format_message(res, "Single Cat", dbCat);
  } else {
    next(new Error("No category with that id"));
  }
};

const patch = async (req, res, next) => {
  const dbCat = await DB.findById(req.params.id);
  if (dbCat) {
    await DB.findByIdAndUpdate(dbCat._id, req.body);
    let result = await DB.findById(dbCat._id);
    helper.format_message(res, "Single Cat", result);
  } else {
    next(new Error("No category with that id"));
  }
};

const drop = async (req, res, next) => {
  const dbCat = await DB.findById(req.params.id);
  if (dbCat) {
    await DB.findByIdAndDelete(dbCat._id);
    helper.format_message(res, "Single Cat", dbCat);
  } else {
    next(new Error("No category with that id"));
  }
};

module.exports = {
  all,
  add,
  get,
  patch,
  drop,
};
