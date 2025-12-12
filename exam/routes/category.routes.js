const router = require("express").Router();
const verify = require("../middleware/verifyToken");
const { create } = require("../controller/category.controller");

router.post("/add", verify, create);

module.exports = router;
