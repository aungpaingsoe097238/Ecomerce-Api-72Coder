const DB = require("../models/permit");
const helper = require("../utils/helper");

const add = async (req, res, next) => {
  let dbPermit = await DB.findOne({ name: req.body.name });
  if (dbPermit) {
    next(new Error("Permission name is alerady in use"));
  } else {
    let result = await new DB(req.body).save();
    helper.format_message(res, "Permission create successfully", result);
  }
};

module.exports = {
  add,
};
