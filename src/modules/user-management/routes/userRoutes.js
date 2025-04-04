const express = require("express");
const router = express.Router();
const controller = require("../controller/userController");

router.post("/register", controller.register);
router.get("/", controller.listUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.patch("/:id/password", controller.updatedUserPassword);
router.delete("/:id", controller.deleteUser);

module.exports = router;
