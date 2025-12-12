const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const { list, create, update, delete: del } = require("../controller/task.controller");

router.get("/", verify, list);
router.post("/add", verify, create);
router.post("/update/:id", verify, update);
router.get("/delete/:id", verify, del);

module.exports = router;
