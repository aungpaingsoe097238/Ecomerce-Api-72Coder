const fs = require("fs");
const userDB = require("../models/user");
const helper = require("../utils/helper");

const migrate = () => {
  let data = fs.readFileSync("./migrations/users.json");
  let users = JSON.parse(data);

  users.forEach(async (user) => {
    user.password = helper.encode(user.password);
    await new userDB(user).save();
  });
};

const backup = async () => {
  let users = await userDB.find();
  fs.writeFileSync("./migrations/backups/users.json", JSON.stringify(users));
};

module.exports = {
  migrate,
  backup,
};
