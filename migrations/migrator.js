const fs = require("fs");
const userDB = require("../models/user");
const permitDB = require("../models/permit");
const roleDB = require("../models/role");
const helper = require("../utils/helper");

const migrate = () => {
  let userData = fs.readFileSync("./migrations/users.json");
  let roleData = fs.readFileSync("./migrations/roles.json");
  let permitData = fs.readFileSync("./migrations/permissions.json");

  let users = JSON.parse(userData);
  let roles = JSON.parse(roleData);
  let permissions = JSON.parse(permitData);

  users.forEach(async (user) => {
    user.password = helper.encode(user.password);
    await new userDB(user).save();
  });

  roles.forEach(async (role) => {
    await new roleDB(role).save();
  });

  permissions.forEach(async (permission) => {
    await new permitDB(permission).save();
  });
};

const backup = async () => {
  let users = await userDB.find();
  let roles = await roleDB.find();
  let permissions = await permitDB.find();
  fs.writeFileSync("./migrations/backups/users.json", JSON.stringify(users));
  fs.writeFileSync("./migrations/backups/roles.json", JSON.stringify(roles));
  fs.writeFileSync(
    "./migrations/backups/permissions.json",
    JSON.stringify(permissions)
  );
};

module.exports = {
  migrate,
  backup,
};
