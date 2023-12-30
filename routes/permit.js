const router = require("express").Router();
const controller = require("../controllers/permit");
const { permitSchema, allSchema } = require("../utils/schema");
const {
  validateBody,
  validateParam,
  validateToken,
} = require("../utils/validator");

router.get("/", [validateToken(), controller.all]);
router.post("/", [
  validateToken(),
  validateBody(permitSchema.add),
  controller.add,
]);
router
  .route("/:id")
  .get(validateParam(allSchema.id, "id"), controller.get)
  .patch(validateParam(allSchema.id, "id"), controller.patch)
  .delete(validateParam(allSchema.id, "id"), controller.drop);

module.exports = router;
