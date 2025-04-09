const express = require("express");
const { addProduct } = require("../controllers/product.controller.js");
const upload = require("../middlewares/multer.middleware.js");
const router = express.Router();

router.post("/add-product", upload.single("image"), addProduct);

module.exports = router;
