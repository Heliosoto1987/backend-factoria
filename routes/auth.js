const { Router } = require("express");
const router = Router();
const { createUser, loginUser } = require("../controllers/auth");

router.post("/new", createUser);
router.post("/", loginUser);

module.exports = router;
