const router = require("express").Router();
const controller = require("../controllers/category");
const { saveFile } = require("../utils/gallery");

router.get("/", controller.all);
router.post("/", [saveFile, controller.add]);
router
  .route("/:id")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.drop);

module.exports = router;
