const router = require("express").Router();

router.use("/", require("./auth.routes"));
router.use("/tasks", require("./task.routes"));
router.use("/categories", require("./category.routes"));

module.exports = router;
