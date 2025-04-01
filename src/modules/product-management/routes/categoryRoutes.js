const express = require("express");
const router = express.Router();
const controller = require("../controller/categoryController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/:id/subcategories", controller.getSubcategories);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
