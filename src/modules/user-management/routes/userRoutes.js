const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router.post("/register", controller.register);
router.get("/", controller.listUsers);

module.exports = router;
