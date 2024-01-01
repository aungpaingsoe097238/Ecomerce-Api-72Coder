const DB = require("../models/subcat");
const CatDB = require("../models/category");
const helper = require("../utils/helper");

const all = async (req, res, next) => {
  let result = await DB.find();
  helper.format_message(res, "All subcat", result);
};

const add = async (req, res, next) => {
  let dbSubCat = await DB.findOne({ name: req.body.name });
  if (dbSubCat) {
    next(new Error("Sub Cat is already in use"));
  } else {
    let mainCat = await CatDB.findById(req.body.catid);
    if (mainCat) {
      let result = await new DB(req.body).save();
      await CatDB.findByIdAndUpdate(mainCat._id, {
        $push: { subcats: result },
      });
      helper.format_message(res, "Save Sub Cat", result);
    } else {
      next(new Error("Main Cat not found"));
    }
  }
};

const drop = async (req, res, next) => {
  let subCat = await DB.findById(req.params.id);
  if (subCat) {
    await CatDB.findByIdAndUpdate(subCat.catid, {
      $pull: { subcats: req.params.id },
    });
    await DB.findByIdAndDelete(subCat._id);
    helper.format_message(res, "Drop Success", []);
  } else {
    next(new Error("Main Cat not found"));
  }
};

module.exports = {
  all,
  add,
  drop,
};
