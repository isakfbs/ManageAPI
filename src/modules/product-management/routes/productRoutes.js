const express = require("express");
const router = express.Router();
const controller = require("../controller/productController");

router.post("/", controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
