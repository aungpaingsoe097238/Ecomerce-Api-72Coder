const router = require("express").Router();
const controller = require("../controllers/permit");
const { permitSchema } = require("../utils/schema");
const { validateBody } = require("../utils/validator");

router.post("/", [validateBody(permitSchema.add), controller.add]);

module.exports = router;
