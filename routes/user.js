const router = require("express").Router();
const controller = require("../controllers/user");
const { userSchema } = require("../utils/schema");
const {
  validateBody,
  validateToken,
  validateRole,
} = require("../utils/validator");

router.post("/register", [
  validateBody(userSchema.register),
  controller.register,
]);

router.post("/login", [validateBody(userSchema.login), controller.login]);

router.post("/add/role", [
  validateToken(),
  validateRole("Owner"),
  validateBody(userSchema.addRole),
  controller.addRole,
]);

router.post("/remove/role", [
  validateToken(),
  validateRole("Owner"),
  validateBody(userSchema.addRole),
  controller.removeRole,
]);

module.exports = router;
