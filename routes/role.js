const router = require("express").Router();
const controller = require("../controllers/role");
const { permitSchema, allSchema, roleSchema } = require("../utils/schema");
const { validateBody, validateParam } = require("../utils/validator");

router.get("/", controller.all);
router.post("/", [validateBody(permitSchema.add), controller.add]);
router.post("/add/permit", [
  validateBody(roleSchema.addPermit),
  controller.roleAddPermit,
]);
router.post("/remove/permit", [
  validateBody(roleSchema.addPermit),
  controller.roleRemovePermit,
]);
router
  .route("/:id")
  .get(validateParam(allSchema.id, "id"), controller.get)
  .patch(validateParam(allSchema.id, "id"), controller.patch)
  .delete(validateParam(allSchema.id, "id"), controller.drop);

module.exports = router;
