const router = require("express").Router();
const controller = require("../controllers/permit");

router.post("/", controller.add);

module.exports = router;
 