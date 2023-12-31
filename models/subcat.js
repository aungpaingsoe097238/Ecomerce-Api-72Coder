const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCatSchema = new Schema({
  name: { type: String, unique: true, required: true },
  image: { type: String, required: true },
  catid: { type: Schema.Types.ObjectId, ref: "category" },
  childcats: [{ type: Schema.Types.ObjectId, ref: "childcat" }],
  created: { type: Date, default: Date.now },
});

const SubCat = mongoose.model("subcat", subCatSchema);
module.exports = SubCat;
