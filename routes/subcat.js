const router = require("express").Router();
const controller = require("../controllers/subcat");
const { saveFile } = require("../utils/gallery");

router.get("/", controller.all);
router.post("/", saveFile, controller.add);
router.route("/:id").delete(controller.drop);

module.exports = router;
