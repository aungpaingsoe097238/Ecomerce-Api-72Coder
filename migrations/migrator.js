const fs = require("fs");
const userDB = require("../models/user");
const permitDB = require("../models/permit");
const roleDB = require("../models/role");
const helper = require("../utils/helper");

const migrate = () => {
  let userData = fs.readFileSync("./migrations/users.json");
  let users = JSON.parse(userData);
  users.forEach(async (user) => {
    user.password = helper.encode(user.password);
    await new userDB(user).save();
  });
};

const roles_permissions_migrate = () => {
  let roleData = fs.readFileSync("./migrations/roles.json");
  let permitData = fs.readFileSync("./migrations/permissions.json");
  let roles = JSON.parse(roleData);
  let permissions = JSON.parse(permitData);
  roles.forEach(async (role) => {
    await new roleDB(role).save();
  });
  permissions.forEach(async (permission) => {
    await new permitDB(permission).save();
  });
};

const add_owner_role = async () => {
  let dbOwner = await userDB.findOne({ phone: "0938843848" });
  let dbRole = await roleDB.findOne({ name: "Owner" });
  await userDB.findByIdAndUpdate(dbOwner._id, { $push: { roles: dbRole._id } });
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
  roles_permissions_migrate,
  add_owner_role
};
