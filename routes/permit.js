const router = require("express").Router();
const controller = require("../controllers/permit");
const { permitSchema, allSchema } = require("../utils/schema");
const { validateBody, validateParam } = require("../utils/validator");

router.get("/", controller.all);
router.post("/", [validateBody(permitSchema.add), controller.add]);
router
  .route("/:id")
  .get(validateParam(allSchema.id, "id"), controller.get)
  .patch(validateParam(allSchema.id, "id"), controller.patch)
  .delete(validateParam(allSchema.id, "id"), controller.drop);

module.exports = router;
