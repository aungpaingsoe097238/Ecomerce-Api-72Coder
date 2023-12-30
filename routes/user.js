const router = require("express").Router();
const controller = require("../controllers/user");
const { userSchema } = require("../utils/schema");
const { validateBody } = require("../utils/validator");

router.post("/register", [
  validateBody(userSchema.register),
  controller.register,
]);

router.post("/login", [validateBody(userSchema.login), controller.login]);

module.exports = router;
